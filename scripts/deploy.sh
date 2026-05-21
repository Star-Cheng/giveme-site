#!/bin/bash
# =============================================================================
# 一键双端部署：阿里云 ECS (.cn) + Cloudflare (.net)
# 用法: npm run deploy
# =============================================================================
set -e

ECS_HOST="${ECS_HOST:-8.145.35.35}"
ECS_USER="${ECS_USER:-root}"
ECS_KEY="${ECS_KEY:-$HOME/.ssh/giveme-site.pem}"
ECS_STATIC_PATH="${ECS_STATIC_PATH:-/var/www/ultrarock}"
ECS_API_PATH="${ECS_API_PATH:-/opt/ultrarock-api}"

SSH_OPTS="-o StrictHostKeyChecking=no -o ConnectTimeout=10"
if [ -f "$ECS_KEY" ]; then
  SSH_CMD="ssh -i $ECS_KEY $SSH_OPTS"
  RSYNC_RSH="ssh -i $ECS_KEY $SSH_OPTS"
else
  SSH_CMD="ssh $SSH_OPTS"
  RSYNC_RSH="ssh $SSH_OPTS"
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# =============================================================================
# 1. 构建（两端共用同一套产物）
# =============================================================================
echo "============================================="
echo " 1/4  构建前端"
echo "============================================="
VITE_CONTACT_API_BASE_URL="https://ultrarock.cn" npx vite build
cp dist/index.html dist/404.html

# =============================================================================
# 2. 部署到阿里云 ECS (.cn)
# =============================================================================
echo ""
echo "============================================="
echo " 2/4  部署 → 阿里云 ECS (ultrarock.cn)"
echo "============================================="

echo "  ↳ 上传静态文件到 ${ECS_STATIC_PATH}"
rsync -avz --delete -e "$RSYNC_RSH" "$ROOT/dist/" "${ECS_USER}@${ECS_HOST}:${ECS_STATIC_PATH}/" 2>&1 | tail -3

echo "  ↳ 上传后端代码到 ${ECS_API_PATH}"
rsync -avz \
  --exclude='node_modules' --exclude='dist' --exclude='client' \
  --exclude='.git' --exclude='.github' --exclude='.env' \
  -e "$RSYNC_RSH" \
  "$ROOT/server/" "$ROOT/shared/" \
  "${ECS_USER}@${ECS_HOST}:${ECS_API_PATH}/" 2>&1 | tail -3

echo "  ↳ 重启 API"
$SSH_CMD "${ECS_USER}@${ECS_HOST}" << 'REMOTE'
  set -e
  cd /opt/ultrarock-api
  pnpm install 2>/dev/null || true
  pm2 delete ultrarock-api 2>/dev/null || true
  export $(grep -v '^#' .env | xargs) 2>/dev/null || true
  pm2 start server/standalone.ts --name ultrarock-api --interpreter /usr/bin/tsx
  pm2 save
REMOTE

echo "  ↳ 验证"
sleep 2
ECS_CHECK=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 https://ultrarock.cn 2>/dev/null || echo "000")
echo "  ultrarock.cn → HTTP ${ECS_CHECK}"

# =============================================================================
# 3. 验证 Git 状态
# =============================================================================
echo ""
echo "============================================="
echo " 3/4  检查 Git 状态"
echo "============================================="

if [ -n "$(git status --porcelain)" ]; then
  echo "  有未提交的更改:"
  git status --short
  echo ""
  
  # 交互式询问（如果终端可交互）
  if [ -t 0 ]; then
    read -p "  是否提交并推送？(y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      git add -A
      git commit -m "deploy: $(date +%Y-%m-%d\ %H:%M)"
      DO_PUSH=true
    else
      echo "  已跳过 Git 提交，.net 端将不会更新"
      DO_PUSH=false
    fi
  else
    echo "  非交互模式，自动提交"
    git add -A
    git commit -m "deploy: $(date +%Y-%m-%d\ %H:%M)"
    DO_PUSH=true
  fi
else
  echo "  工作区干净，无需提交"
  DO_PUSH=false
fi

# =============================================================================
# 4. 推送 → 触发 Cloudflare 部署 (.net)
# =============================================================================
echo ""
echo "============================================="
echo " 4/4  部署 → Cloudflare (ultrarock.net)"
echo "============================================="

if [ "$DO_PUSH" = true ]; then
  echo "  ↳ git push origin main"
  git push origin main
  echo "  ↳ GitHub Actions 将自动构建并部署 ultrarock.net"
else
  echo "  ↳ 无新提交，或已跳过。ultrarock.net 保持不变"
fi

# =============================================================================
# 完成
# =============================================================================
echo ""
echo "============================================="
echo " ✅ 双端部署完成"
echo "    https://ultrarock.cn   (阿里云 ECS)"
echo "    https://ultrarock.net  (Cloudflare)"
echo "============================================="
