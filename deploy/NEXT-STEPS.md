# Deployment Next Steps — appshift

## Stack Identified
| Item | Detail |
|------|--------|
| Runtime | Node.js 18.17+ (recommend 20 LTS) |
| Framework | Next.js 15 + Payload CMS 3.x |
| Language | TypeScript |
| Package manager | **pnpm** (pnpm-lock.yaml present) |
| Database | PostgreSQL 15 |
| Default port | **3000** |

---

## Step 1 — Start PostgreSQL

The repo ships a `docker-compose.yml` that spins up Postgres only.

**Option A — Docker (recommended if Docker is installed)**
```bash
cd /var/www/appshift
docker compose up -d db
```

**Option B — Native PostgreSQL**
```bash
apt-get install -y postgresql postgresql-contrib
sudo -u postgres psql -c "CREATE USER payload WITH PASSWORD 'payload_password';"
sudo -u postgres psql -c "CREATE DATABASE appshift OWNER payload;"
```
Then update `DATABASE_URL` in `.env` accordingly.

---

## Step 2 — Fill in .env

```bash
nano /var/www/appshift/.env
```

| Variable | Description |
|----------|-------------|
| `PAYLOAD_SECRET` | **Required.** Strong random string. Generate with: `openssl rand -base64 32` |
| `DATABASE_URL` | PostgreSQL connection string. Default: `postgresql://payload:payload_password@localhost:5432/appshift` |
| `SEED_TOKEN` | Optional. Protects the `/seed` HTTP route. |
| `SEED_ADMIN_PASSWORD` | Password for the first admin account created by the seed script. |

---

## Step 3 — Build the app

```bash
cd /var/www/appshift
pnpm build
```

This compiles Next.js + Payload CMS into `.next/`. Takes 1–3 minutes.

---

## Step 4 — Run with PM2 (process manager)

```bash
npm install -g pm2

# Start
cd /var/www/appshift
pm2 start "pnpm start" --name appshift

# Auto-restart on server reboot
pm2 startup
pm2 save
```

The app listens on **port 3000**.

---

## Step 5 — Nginx reverse proxy

Install Nginx, then create `/etc/nginx/sites-available/appshift`:

```nginx
server {
    listen 80;
    server_name your-domain.com;   # <-- replace

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/appshift /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

## Step 6 — TLS with Certbot (optional but strongly recommended)

```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

---

## Summary of ports / services

| Service | Port | Notes |
|---------|------|-------|
| Next.js app | 3000 | Internal only; proxied by Nginx |
| PostgreSQL | 5432 | Internal only; do NOT expose publicly |
| Nginx | 80 / 443 | Public-facing |
