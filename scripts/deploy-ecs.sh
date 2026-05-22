#!/bin/bash
# =============================================================================
# 本地构建 → 上传到阿里云 ECS
# 用法:
#   ECS_HOST=8.145.35.35 npm run deploy:ecs
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

echo "=== 1. 构建前端（目标 API: https://ultrarock.cn） ==="
VITE_CONTACT_API_BASE_URL="https://ultrarock.cn" \
VITE_ICP_BEIAN="${VITE_ICP_BEIAN:-粤ICP备2026062248号-1}" \
npx vite build
# SPA fallback
cp dist/index.html dist/404.html

echo "=== 2. 上传静态文件到 ECS: ${ECS_STATIC_PATH} ==="
rsync -avz --delete \
  -e "$RSYNC_RSH" \
  "$ROOT/dist/" \
  "${ECS_USER}@${ECS_HOST}:${ECS_STATIC_PATH}/"

echo "=== 3. 上传后端代码到 ECS: ${ECS_API_PATH} ==="
# 注意：不加 --delete，避免误删 .env 等运行时文件
rsync -avz \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='client' \
  --exclude='.git' \
  --exclude='.github' \
  --exclude='.env' \
  -e "$RSYNC_RSH" \
  "$ROOT/server/" "$ROOT/shared/" \
  "${ECS_USER}@${ECS_HOST}:${ECS_API_PATH}/"

echo "=== 4. 重启 API（保留 .env 环境变量） ==="
$SSH_CMD "${ECS_USER}@${ECS_HOST}" << 'REMOTE'
  set -e
  cd /opt/ultrarock-api
  
  # 装依赖（仅当有变更时）
  if command -v pnpm &>/dev/null; then pnpm install 2>/dev/null || true; fi
  
  # 用 .env 里的环境变量重启
  pm2 delete ultrarock-api 2>/dev/null || true
  export $(grep -v '^#' .env | xargs) 2>/dev/null || true
  pm2 start server/standalone.ts --name ultrarock-api --interpreter /usr/bin/tsx
  pm2 save
  
  echo ""
  echo "=== PM2 状态 ==="
  pm2 status
  echo ""
  echo "=== 验证 ==="
  sleep 2
  curl -s https://ultrarock.cn/api/health
REMOTE

echo ""
echo "============================================"
echo " 部署完成 → https://ultrarock.cn"
echo "============================================"
