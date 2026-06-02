# BengaluruBeyond Deployment Guide

This guide will help you deploy both the React frontend and .NET API backend to production.

## Architecture Overview

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   React App     │ ──────> │   .NET API      │ ──────> │   PostgreSQL    │
│   (Vercel)      │         │   (Railway)     │         │   (Railway)     │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

## Step 1: Deploy PostgreSQL Database (Railway)

1. Go to [Railway](https://railway.app) and sign up/login
2. Click "New Project" → "Provision PostgreSQL"
3. Once created, click on the PostgreSQL service
4. Go to "Variables" tab and copy the `DATABASE_URL`
   - It looks like: `postgresql://user:pass@host:5432/railway`

## Step 2: Deploy Backend API (Railway)

### Option A: Deploy via GitHub

1. Push the `BengaluruBeyond.API` folder to a GitHub repository
2. In Railway, click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables (Settings → Variables):

```
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings__DefaultConnection=<your-postgres-url>
Jwt__Key=<generate-a-strong-64-char-secret>
AllowedOrigins__0=https://your-frontend-url.vercel.app
```

5. Railway will auto-deploy and give you a URL like `https://bengalurubeyond-api.railway.app`

### Option B: Deploy via Railway CLI

```bash
cd BengaluruBeyond.API
npm install -g @railway/cli
railway login
railway init
railway up
```

### Set Environment Variables

In Railway dashboard, add these variables:

| Variable | Value |
|----------|-------|
| `ASPNETCORE_ENVIRONMENT` | `Production` |
| `ConnectionStrings__DefaultConnection` | `<PostgreSQL URL from Step 1>` |
| `Jwt__Key` | `<64+ character random string>` |
| `AllowedOrigins__0` | `https://your-app.vercel.app` |

Generate a JWT key:
```bash
openssl rand -base64 64
```

## Step 3: Deploy Frontend (Vercel)

### Option A: Deploy via Vercel Dashboard

1. Go to [Vercel](https://vercel.com) and sign up/login
2. Click "Add New" → "Project"
3. Import your GitHub repository (the `learn-react` folder)
4. Set build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variable:
   - `VITE_API_URL` = `https://your-api.railway.app/api`
6. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
cd learn-react
npm install -g vercel
vercel login
vercel --prod
```

When prompted, set the environment variable:
```
VITE_API_URL=https://your-api.railway.app/api
```

## Step 4: Update CORS (Backend)

After deploying the frontend, update the backend's allowed origins:

1. Go to Railway dashboard
2. Select your API service
3. Go to Variables
4. Update `AllowedOrigins__0` to your Vercel URL (e.g., `https://bengalurubeyond.vercel.app`)
5. Redeploy the service

## Step 5: Verify Deployment

1. **Frontend**: Visit your Vercel URL
2. **Backend Health**: Visit `https://your-api.railway.app/health`
3. **Swagger Docs**: Visit `https://your-api.railway.app/swagger`
4. **Admin Login**: Go to `https://your-frontend.vercel.app/admin`
   - Username: `admin`
   - Password: `admin123`

## Custom Domain Setup (IMPORTANT)

### Step 1: Purchase a Domain

Choose a domain registrar:
- **[GoDaddy](https://godaddy.com)** - Most popular, ~₹599/year for .com
- **[Namecheap](https://namecheap.com)** - Better pricing, ~₹699/year for .com
- **[Google Domains](https://domains.google)** - Clean interface, ~₹1,200/year
- **[Hostinger](https://hostinger.in)** - Cheapest, ~₹499/year for .in domains

**Recommended**: Search for `bengalurubeyond.com` or `bengalurubeyond.in`

### Step 2: Configure DNS for Frontend (Vercel)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Click "Add Domain" and enter your domain (e.g., `bengalurubeyond.com`)
3. Vercel will show required DNS records. In your domain registrar, add:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.19.19 |
| CNAME | www | cname.vercel-dns.com |

4. Wait 5-10 minutes for DNS propagation
5. Vercel automatically provides **FREE SSL certificate** (HTTPS)

### Step 3: Configure DNS for Backend (Railway)

1. Go to Railway Dashboard → Your API Service → Settings → Networking
2. Click "Generate Domain" or "Custom Domain"
3. Add a subdomain (e.g., `api.bengalurubeyond.com`)
4. Add DNS record at your registrar:

| Type | Name | Value |
|------|------|-------|
| CNAME | api | your-service.railway.app |

### Step 4: Update Environment Variables

After setting up domains, update:

**Frontend (Vercel):**
```
VITE_API_URL=https://api.bengalurubeyond.com/api
VITE_SITE_URL=https://bengalurubeyond.com
```

**Backend (Railway):**
```
AllowedOrigins__0=https://bengalurubeyond.com
AllowedOrigins__1=https://www.bengalurubeyond.com
```

### SSL/HTTPS (Automatic)
- **Vercel**: Automatic SSL via Let's Encrypt (FREE)
- **Railway**: Automatic SSL (FREE)

## Environment Variables Reference

### Backend (.NET API)

| Variable | Description | Required |
|----------|-------------|----------|
| `ASPNETCORE_ENVIRONMENT` | Set to `Production` | Yes |
| `ConnectionStrings__DefaultConnection` | PostgreSQL connection string | Yes |
| `Jwt__Key` | Secret key for JWT tokens (64+ chars) | Yes |
| `Jwt__Issuer` | JWT issuer (default: BengaluruBeyond.API) | No |
| `Jwt__Audience` | JWT audience (default: BengaluruBeyond.Client) | No |
| `AllowedOrigins__0` | Frontend URL for CORS | Yes |
| `AllowedOrigins__1` | Additional allowed origin | No |

### Frontend (React)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |
| `VITE_APP_NAME` | App name | No |

## Troubleshooting

### CORS Errors
- Ensure `AllowedOrigins__0` in backend matches your frontend URL exactly
- Don't include trailing slash in the URL

### Database Connection Errors
- Verify PostgreSQL URL is correct
- Check if database is running in Railway dashboard

### 401 Unauthorized Errors
- JWT key must be same across restarts
- Check if token is being sent in Authorization header

### Build Failures
- Check build logs in Railway/Vercel dashboard
- Ensure all dependencies are in package.json/csproj

## Security Checklist (CRITICAL for Production)

### ✅ Immediately After Deployment
- [ ] **CHANGE DEFAULT PASSWORD** - Login to admin panel and change from `admin123`
- [ ] Use strong JWT secret (64+ characters, randomly generated)
- [ ] Verify CORS only allows your specific frontend domain

### ✅ Security Headers (Already Configured)
The following security headers are automatically applied:
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-XSS-Protection: 1; mode=block` - XSS protection
- `Strict-Transport-Security` - Forces HTTPS
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer info
- `Permissions-Policy` - Restricts browser features

### ✅ Backend Security
- [ ] Keep .NET and packages updated (`dotnet outdated`)
- [ ] Never expose database connection strings in code
- [ ] Rate limiting is enabled on API
- [ ] All admin endpoints require JWT authentication

### ✅ Password Policy
- [ ] Change admin password immediately after first login
- [ ] Use passwords with 12+ characters, mixed case, numbers, symbols
- [ ] Consider implementing password rotation every 90 days

### ✅ Ongoing Security
- [ ] Monitor Railway/Vercel logs for suspicious activity
- [ ] Set up alerts for failed login attempts
- [ ] Regularly backup database
- [ ] Keep dependencies updated monthly

## Estimated Costs

| Service | Free Tier | Paid |
|---------|-----------|------|
| Railway (API + DB) | $5/month credit | ~$5-20/month |
| Vercel (Frontend) | Unlimited for hobby | $20/month pro |
| Total | ~$0-5/month | ~$25-40/month |

## Support

If you encounter issues:
1. Check the logs in Railway/Vercel dashboard
2. Verify environment variables are set correctly
3. Test API endpoints directly using the Swagger UI
