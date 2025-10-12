# DashCams - Professional Dashcam Store

A professional AutoTrader-style website for selling dashcams and hardwiring kits, with installer listings and blog content.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: Prisma + PostgreSQL for data management
- **Authentication**: NextAuth for admin login
- **Payments**: Stripe integration for secure payments
- **Responsive Design**: Mobile-first, professional AutoTrader-style UI
- **Admin Dashboard**: Complete content management system
- **Blog System**: Dynamic blog posts with SEO optimization
- **Installer Network**: Find and connect with professional installers

## 📄 Pages & Structure

### Public Pages
- **Home**: Hero section, featured products, quick search
- **Shop**: Product listings with filters and search
- **Product Details**: Full product specs, images, and purchase options
- **Find Installer**: Search and connect with professional installers
- **Blog**: Article listings and individual post pages
- **Contact**: Contact form and company information

### Admin Pages
- **Admin Dashboard**: Overview of orders, products, and analytics
- **Product Management**: Add, edit, and manage products
- **Order Management**: Process and track orders
- **Blog Management**: Create and manage blog posts
- **Installer Management**: Manage installer listings

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma + PostgreSQL
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Data Fetching**: React Query
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🗄 Database Models

- **User**: Admin and customer accounts
- **Product**: Dashcams, hardwiring kits, accessories
- **Order**: Customer orders and order items
- **Installer**: Professional installer listings
- **BlogPost**: Blog articles and content

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dashcams
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your values:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/dashcams_db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Features

- **AutoTrader-style Layout**: Clean, professional design with strong use of white space
- **Responsive Grid System**: Consistent layout across desktop, tablet, and mobile
- **Modern UI Components**: Reusable components with consistent styling
- **Professional Color Scheme**: Blue accent colors for trust and reliability
- **High-Quality Product Cards**: Optimized for product showcase
- **SEO Optimized**: Meta tags, structured data, and performance optimization

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Friendly**: Adapted layouts for tablet screens
- **Desktop Enhanced**: Full-featured desktop experience
- **Touch Optimized**: Touch-friendly interactions

## 🔧 Admin Features

- **Dashboard Overview**: Key metrics and recent activity
- **Product Management**: Full CRUD operations for products
- **Order Processing**: Order management and status updates
- **Content Management**: Blog post creation and editing
- **Installer Management**: Manage installer listings
- **Analytics**: Sales and performance metrics

## 💳 Payment Integration

- **Stripe Checkout**: Secure payment processing
- **Order Management**: Complete order lifecycle
- **Inventory Tracking**: Stock management and alerts
- **Receipt Generation**: Automated order confirmations

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Import your GitHub repository to Vercel
   - Configure environment variables in Vercel dashboard

2. **Database Setup**
   - Set up PostgreSQL database (recommend Vercel Postgres or Supabase)
   - Update `DATABASE_URL` in Vercel environment variables

3. **Deploy**
   - Vercel will automatically deploy on git push
   - Configure custom domain if needed

### Environment Variables for Production

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret"
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
GOOGLE_MAPS_API_KEY="your-production-key"
```

## 📊 SEO Features

- **Meta Tags**: Optimized title and description tags
- **Structured Data**: Product and organization markup
- **Sitemap**: Automatic sitemap generation
- **Performance**: Optimized images and code splitting
- **Accessibility**: WCAG compliant design

## 🔒 Security Features

- **Authentication**: Secure admin login with NextAuth
- **Data Validation**: Input validation and sanitization
- **CSRF Protection**: Built-in CSRF protection
- **Secure Headers**: Security headers configuration
- **Environment Variables**: Secure credential management

## 📈 Performance

- **Next.js 14**: Latest performance optimizations
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Caching**: Optimized caching strategies
- **CDN**: Global content delivery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@dashcams.co.uk
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS