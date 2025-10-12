# Deployment Guide - DashCams Website

This guide will help you deploy your DashCams website to Vercel with all the necessary configurations.

## 🚀 Vercel Deployment

### Step 1: Prepare Your Repository

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial DashCams website setup"
   git push origin main
   ```

### Step 2: Connect to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - Framework Preset: Next.js
   - Root Directory: `dashcams` (if your project is in a subfolder)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Step 3: Set Up Database

#### Option A: Vercel Postgres (Recommended)
1. **In Vercel Dashboard, go to Storage tab**
2. **Create a new Postgres database**
3. **Copy the connection string**

#### Option B: External Database (Supabase, PlanetScale, etc.)
1. **Set up your preferred PostgreSQL provider**
2. **Get the connection string**

### Step 4: Configure Environment Variables

In Vercel Dashboard, go to Settings > Environment Variables and add:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-here

# Stripe (Get from Stripe Dashboard)
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Google Maps (Optional)
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### Step 5: Deploy

1. **Click "Deploy" in Vercel**
2. **Wait for deployment to complete**
3. **Your site will be live at: `https://your-project.vercel.app`**

## 🗄 Database Setup

### After Deployment

1. **Run Prisma Commands**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   ```

2. **Seed Database (Optional)**
   ```bash
   # Create a seed script if needed
   npx prisma db seed
   ```

## 🔧 Post-Deployment Configuration

### 1. Set Up Stripe Webhooks

1. **Go to Stripe Dashboard > Webhooks**
2. **Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`**
3. **Select events: `checkout.session.completed`, `payment_intent.succeeded`**
4. **Copy webhook secret to environment variables**

### 2. Configure Domain (Optional)

1. **In Vercel Dashboard, go to Settings > Domains**
2. **Add your custom domain**
3. **Update NEXTAUTH_URL in environment variables**

### 3. Set Up Admin User

1. **Create admin user in database:**
   ```sql
   INSERT INTO "User" (id, name, email, passwordHash, role) 
   VALUES ('admin-id', 'Admin User', 'admin@yourdomain.com', 'hashed-password', 'ADMIN');
   ```

## 🔒 Security Checklist

- [ ] Environment variables are set correctly
- [ ] Database is secured with strong credentials
- [ ] Stripe keys are production keys (not test keys)
- [ ] NEXTAUTH_SECRET is a strong, random string
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Admin user has strong password

## 📊 Monitoring & Analytics

### Vercel Analytics
1. **Enable Vercel Analytics in dashboard**
2. **Monitor performance and user behavior**

### Error Monitoring
1. **Consider adding Sentry for error tracking**
2. **Set up alerts for critical errors**

## 🚀 Performance Optimization

### Image Optimization
- [ ] Use Next.js Image component for all images
- [ ] Optimize image sizes and formats
- [ ] Consider using a CDN for static assets

### Database Optimization
- [ ] Add database indexes for frequently queried fields
- [ ] Monitor database performance
- [ ] Set up database backups

## 🔄 Continuous Deployment

### Automatic Deployments
- **Vercel automatically deploys on git push to main branch**
- **Preview deployments for pull requests**

### Manual Deployments
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from local
vercel --prod
```

## 🛠 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Database Connection Issues**
   - Verify DATABASE_URL is correct
   - Check database is accessible from Vercel
   - Run `npx prisma db push` to sync schema

3. **Authentication Issues**
   - Verify NEXTAUTH_URL matches your domain
   - Check NEXTAUTH_SECRET is set
   - Ensure admin user exists in database

### Debug Commands

```bash
# Check build locally
npm run build

# Type check
npm run type-check

# Lint code
npm run lint

# Database operations
npm run db:generate
npm run db:push
```

## 📈 Scaling Considerations

### Database Scaling
- **Consider connection pooling for high traffic**
- **Monitor database performance**
- **Set up read replicas if needed**

### Application Scaling
- **Vercel automatically scales with traffic**
- **Consider edge functions for global performance**
- **Monitor function execution times**

## 🔐 Security Best Practices

1. **Regular Security Updates**
   - Keep dependencies updated
   - Monitor for security vulnerabilities

2. **Access Control**
   - Limit admin access
   - Use strong passwords
   - Enable 2FA where possible

3. **Data Protection**
   - Encrypt sensitive data
   - Regular backups
   - GDPR compliance

## 📞 Support

If you encounter issues:

1. **Check Vercel deployment logs**
2. **Review environment variables**
3. **Test database connectivity**
4. **Contact support with specific error messages**

---

Your DashCams website should now be live and fully functional! 🎉
