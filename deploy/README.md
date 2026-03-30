# YouTillEyes — AWS EC2 Deployment Guide

## Prerequisites on EC2 (Ubuntu 22.04 recommended)

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Install pnpm
npm install -g pnpm

# 4. Install PM2 (process manager)
npm install -g pm2

# 5. Install nginx
sudo apt install -y nginx

# 6. Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib
```

---

## Database Setup

```bash
sudo -u postgres psql
```

Inside psql:
```sql
CREATE USER youtilleyes WITH PASSWORD 'your_strong_password';
CREATE DATABASE youtilleyes OWNER youtilleyes;
GRANT ALL PRIVILEGES ON DATABASE youtilleyes TO youtilleyes;
\q
```

---

## Clone & Install

```bash
cd /home/ubuntu
git clone https://github.com/YOUR_GITHUB_USERNAME/youtileyes.git
cd youtileyes
pnpm install
```

---

## Environment Variables

```bash
cp .env.example .env
nano .env
```

Fill in your values (see `.env.example`).

---

## Build & Seed

```bash
# Push DB schema
pnpm --filter @workspace/db run push-force

# Seed demo data (optional)
pnpm --filter @workspace/scripts run seed

# Build API server
pnpm --filter @workspace/api-server run build

# Build frontend
pnpm --filter @workspace/youtilleyes run build
```

---

## Start with PM2

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Follow the command PM2 outputs for systemd startup.

---

## Nginx Configuration

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/youtilleyes
sudo ln -s /etc/nginx/sites-available/youtilleyes /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## SSL (HTTPS) — Optional but recommended

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Useful Commands

```bash
pm2 logs            # View live logs
pm2 status          # Check app status
pm2 restart all     # Restart everything
pm2 stop all        # Stop everything
```
