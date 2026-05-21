#!/bin/bash
# =============================================================================
# Ultra Rock ECS 初始化脚本
# 在阿里云 ECS 上执行一次即可（Ubuntu 22.04 / Debian）
# 用法: ssh root@<ecs-ip> 'bash -s' < scripts/ecs-setup.sh
# =============================================================================
set -e

echo "=== 1. 安装系统依赖 ==="
apt update
apt install -y curl git nginx certbot python3-certbot-nginx

echo "=== 2. 安装 Node.js 22 + pnpm + pm2 ==="
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt install -y nodejs
fi
npm install -g pnpm pm2

echo "=== 3. 创建工作目录 ==="
mkdir -p /var/www/ultrarock /opt/ultrarock-api
chown -R "$(logname):$(logname)" /var/www/ultrarock /opt/ultrarock-api 2>/dev/null || true

echo "=== 4. 克隆后端代码 ==="
if [ ! -d /opt/ultrarock-api/.git ]; then
  git clone https://github.com/star-cheng/giveme-site.git /opt/ultrarock-api
fi
cd /opt/ultrarock-api
git pull origin main
pnpm install --prod --filter=false 2>/dev/null || pnpm install

echo "=== 5. 配置环境变量（如未配置 SMTP 则跳过） ==="
if [ ! -f /opt/ultrarock-api/.env ]; then
  cat > /opt/ultrarock-api/.env << 'ENVEOF'
# SMTP 邮箱配置（QQ 邮箱需使用授权码，非登录密码）
SMTP_HOST=smtp.qq.com
SMTP_PORT=465
SMTP_USER=ur@ultrarock.net
SMTP_PASS=请替换为QQ邮箱授权码
CONTACT_RECEIVER_EMAIL=ur@ultrarock.net
RESUME_RECEIVER_EMAIL=ur@ultrarock.net
CLIENT_BASE_PATH=/
ENVEOF
  echo "  ⚠️  已生成 .env 模板，请编辑 /opt/ultrarock-api/.env 填入 SMTP_PASS"
fi

echo "=== 6. 启动 Express API (PM2) ==="
cd /opt/ultrarock-api
pm2 delete ultrarock-api 2>/dev/null || true
pm2 start server/index.ts \
  --name ultrarock-api \
  --interpreter tsx \
  --env-file .env
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null || true

echo "=== 7. 部署 Nginx 配置 ==="
cat > /etc/nginx/sites-available/ultrarock << 'NGINXEOF'
# =============================================================================
# Ultra Rock — ultrarock.cn
# 静态 SPA + API 代理
# =============================================================================

# HTTP → HTTPS 重定向
server {
    listen 80;
    server_name ultrarock.cn www.ultrarock.cn;

    # Let's Encrypt 验证
    location /.well-known/acme-challenge/ {
        root /var/www/ultrarock;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS
server {
    listen 443 ssl http2;
    server_name ultrarock.cn www.ultrarock.cn;

    # SSL 证书（certbot 自动管理）
    ssl_certificate     /etc/letsencrypt/live/ultrarock.cn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ultrarock.cn/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    root /var/www/ultrarock;
    index index.html;

    # 静态资源缓存
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback: 所有非文件请求返回 index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理 → Express 3000
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # 文件上传支持（简历）
        client_max_body_size 10m;
    }
}
NGINXEOF

ln -sf /etc/nginx/sites-available/ultrarock /etc/nginx/sites-enabled/ultrarock
rm -f /etc/nginx/sites-enabled/default

echo "=== 8. 申请 SSL 证书（Let's Encrypt） ==="
# 先临时用 HTTP 启动 Nginx，让 certbot 验证通过
nginx -t && systemctl reload nginx || true
certbot --nginx -d ultrarock.cn -d www.ultrarock.cn --non-interactive --agree-tos -m ur@ultrarock.net || {
  echo "  ⚠️  certbot 自动获取失败，请手动执行:"
  echo "     certbot --nginx -d ultrarock.cn -d www.ultrarock.cn"
}

echo "=== 9. 设置证书自动续期 ==="
systemctl enable certbot.timer 2>/dev/null || true

echo ""
echo "============================================"
echo " ECS 初始化完成。"
echo " 静态文件目录: /var/www/ultrarock/"
echo " API 进程管理: pm2 status"
echo " Nginx 日志:   /var/log/nginx/"
echo ""
echo " 下一步：在本地执行 npm run deploy:ecs 上传静态文件"
echo "============================================"
