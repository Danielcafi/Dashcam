import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DashCams - Premium Dashcams & Professional Installation",
  description: "Your trusted partner for premium dashcams and professional installation services across the UK.",
  keywords: "dashcams, car cameras, hardwiring, installation, UK",
  other: {
    'preload': '/shop, /installers, /blog, /contact',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/shop" as="document" />
        <link rel="preload" href="/installers" as="document" />
        <link rel="preload" href="/blog" as="document" />
        <link rel="preload" href="/contact" as="document" />
        <link rel="preload" href="/cam2.webp" as="image" />
        <link rel="preload" href="/mercedes1.webp" as="image" />
        <link rel="preload" href="/phone1.webp" as="image" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance optimization
              if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                  // Preload critical resources
                  const links = ['/shop', '/installers', '/blog', '/contact'];
                  links.forEach(href => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = href;
                    document.head.appendChild(link);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
