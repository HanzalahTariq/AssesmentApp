# Deployment Guide (DigitalOcean/Remote Server)

This guide helps you deploy the Assessment Web App to your remote server (Ubuntu/Linux).

## 1. Push Code to GitHub
1. Ensure your local changes are committed.
2. Push to your repository:
   ```bash
   git push origin main
   ```

## 2. Connect to Server
SSH into your server:
```bash
ssh root@76.13.181.70
# Password: StrongAsim@123!!
```

## 3. Clone Repository
Navigate to your web directory (e.g., `/var/www`):
```bash
cd /var/www
git clone https://github.com/mharis161/WebAppAssement.git assessment-app
cd assessment-app
```

## 4. Setup Backend (Server)
1. Install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Configure Environment:
   ```bash
   cp .env.example .env
   nano .env
   ```
   Update `.env` values:
   - `DB_USER=root_remote` (or your user)
   - `DB_PASS=StrongAsim@123!!`
   - `DB_HOST=127.0.0.1` (Keep as localhost inside the server)

3. Initialize Database (Optional if already exists):
   ```bash
   node create_db.js
   ```

## 5. Setup Frontend (Client)
1. Install dependencies & Build:
   ```bash
   cd ../client
   npm install
   npm run build
   ```
   This creates a `dist` folder with the optimized React app.

## 6. Run Application
Go back to server folder and start the app:
```bash
cd ../server
npm start
```
Or use PM2 (Recommended for production to keep it running):
```bash
npm install -g pm2
pm2 start index.js --name "assessment-app"
pm2 save
pm2 startup
```

The app will run on port `5000` by default.
Access it at: `http://76.13.181.70:5000`

## Troubleshooting
- If you can't access port 5000, check firewall:
  ```bash
  ufw allow 5000
  ```
- If DB connection fails, ensure MySQL user `root_remote` has access from `127.0.0.1`.
