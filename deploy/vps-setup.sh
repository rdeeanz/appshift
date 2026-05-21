#!/usr/bin/env bash
# VPS setup script for appshift (Next.js 15 + Payload CMS + PostgreSQL)
# Run as root or a user with sudo privileges.
# Usage: bash vps-setup.sh

set -euo pipefail

REPO_URL="https://github.com/rdeeanz/appshift"
APP_DIR="/var/www/appshift"
NODE_VERSION="20"   # LTS; Next.js 15 requires >= 18.17

echo "==> [1/8] Checking / installing git"
if ! command -v git &>/dev/null; then
  apt-get update -y && apt-get install -y git
fi
git --version

echo "==> [2/8] Ensuring /var/www exists"
mkdir -p /var/www

echo "==> [3/8] Cloning repository"
if [ -d "$APP_DIR/.git" ]; then
  echo "  Repo already cloned — pulling latest instead"
  git -C "$APP_DIR" pull origin main
else
  git clone "$REPO_URL" "$APP_DIR"
fi

echo "==> [4/8] Installing Node.js $NODE_VERSION (via NodeSource)"
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
  apt-get install -y nodejs
fi
node --version

echo "==> [5/8] Installing pnpm"
if ! command -v pnpm &>/dev/null; then
  npm install -g pnpm
fi
pnpm --version

echo "==> [6/8] Installing project dependencies"
cd "$APP_DIR"
pnpm install --frozen-lockfile

echo "==> [7/8] Setting up .env"
if [ ! -f "$APP_DIR/.env" ]; then
  cp "$APP_DIR/.env.example" "$APP_DIR/.env"
  echo ""
  echo "  *** ACTION REQUIRED ***"
  echo "  Edit $APP_DIR/.env and fill in the following values:"
  echo "    PAYLOAD_SECRET       — a strong random string (e.g. openssl rand -base64 32)"
  echo "    DATABASE_URL         — postgresql://payload:payload_password@localhost:5432/appshift"
  echo "    SEED_TOKEN           — optional; used to protect the /seed route"
  echo "    SEED_ADMIN_PASSWORD  — password for the first admin user"
  echo "  Then re-run: pnpm build"
else
  echo "  .env already exists — skipping copy"
fi

echo "==> [8/8] Setting file ownership and permissions"
chown -R www-data:www-data "$APP_DIR"
chmod -R 755 "$APP_DIR"

echo ""
echo "======================================================"
echo " Setup complete (no services started)"
echo " Next steps — see deploy/NEXT-STEPS.md"
echo "======================================================"
