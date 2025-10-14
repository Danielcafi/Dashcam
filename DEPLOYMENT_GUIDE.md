# Vercel Deployment Guide

## Environment Variables Required

Add these environment variables in your Vercel dashboard:

### Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Stripe Configuration
```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### NextAuth Configuration
```
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret
```

## Common Deployment Issues & Solutions

### 1. FUNCTION_INVOCATION_FAILED (500)
- **Cause**: Missing environment variables
- **Solution**: Add all required environment variables in Vercel dashboard

### 2. DEPLOYMENT_BLOCKED (403)
- **Cause**: Build command failing
- **Solution**: Ensure `npm run build` works locally

### 3. FUNCTION_INVOCATION_TIMEOUT (504)
- **Cause**: Functions taking too long to execute
- **Solution**: Optimize API routes and database queries

### 4. BODY_NOT_A_STRING_FROM_FUNCTION (502)
- **Cause**: API route returning invalid response
- **Solution**: Ensure API routes return proper JSON responses

## Build Configuration

The project is configured with:
- Next.js 15.5.4
- TypeScript
- Tailwind CSS
- Firebase
- Stripe

## Deployment Steps

1. Connect your GitHub repository to Vercel
2. Add all environment variables
3. Deploy automatically on push to main branch
