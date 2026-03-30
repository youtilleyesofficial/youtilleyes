#!/bin/bash
set -e

echo "=== YouTillEyes EC2 Setup Script ==="
echo "Ubuntu 24.04 | Mumbai (ap-south-1)"

# 1. System update
echo "[1/8] Updating system..."
sudo apt update -y && sudo apt upgrade -y

# 2. Node.js 20
echo "[2/8] Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. pnpm
echo "[3/8] Installing pnpm..."
npm install -g pnpm

# 4. PM2
echo "[4/8] Installing PM2..."
npm install -g pm2

# 5. Nginx
echo "[5/8] Installing Nginx..."
sudo apt install -y nginx
sudo systemctl enable nginx

# 6. PostgreSQL
echo "[6/8] Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Create DB user and database
echo "[6b] Setting up database..."
sudo -u postgres psql -c "CREATE USER youtilleyes WITH PASSWORD 'YoutillEyes@2026';" 2>/dev/null || true
sudo -u postgres psql -c "CREATE DATABASE youtilleyes OWNER youtilleyes;" 2>/dev/null || true
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE youtilleyes TO youtilleyes;" 2>/dev/null || true

# 7. Clone repo
echo "[7/8] Cloning repository..."
cd /home/ubuntu
if [ -d "youtilleyes" ]; then
  echo "Repo already exists, pulling latest..."
  cd youtilleyes && git pull
else
  git clone https://github.com/youtilleyesofficial/youtilleyes.git
  cd youtilleyes
fi

# Create .env
echo "[7b] Creating .env file..."
cat > .env << 'EOF'
DATABASE_URL=postgresql://youtilleyes:YoutillEyes@2026@localhost:5432/youtilleyes
SESSION_SECRET=youtilleyes_super_secret_jwt_key_mumbai_2026_change_this
PORT=8080
NODE_ENV=production
EOF

# 8. Install, build, deploy
echo "[8/8] Installing dependencies & building..."
pnpm install
pnpm --filter @workspace/db run push-force
pnpm --filter @workspace/scripts run seed 2>/dev/null || true
pnpm --filter @workspace/api-server run build
pnpm --filter @workspace/youtilleyes run build

# Nginx config
echo "Configuring Nginx..."
sudo tee /etc/nginx/sites-available/youtilleyes > /dev/null << 'NGINX'
server {
    listen 80;
    server_name youtilleyes.com www.youtilleyes.com 13.126.9.89;

    root /home/ubuntu/youtilleyes/artifacts/youtilleyes/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
NGINX

sudo ln -sf /etc/nginx/sites-available/youtilleyes /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx

# Start PM2
echo "Starting app with PM2..."
pm2 delete youtilleyes-api 2>/dev/null || true
pm2 start /home/ubuntu/youtilleyes/artifacts/api-server/dist/index.mjs \
  --name youtilleyes-api \
  --interpreter node \
  --node-args="--enable-source-maps" \
  --env NODE_ENV=production

pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu

echo ""
echo "======================================"
echo "  YouTillEyes deployed successfully!"
echo "  Open: http://13.126.9.89"
echo "======================================"
