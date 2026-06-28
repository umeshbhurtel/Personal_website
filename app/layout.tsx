import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: 'Umesh Bhurtel — IT Researcher & R&D Associate',
  description: 'Personal portfolio and R&D showcase of Umesh Bhurtel. Researcher, technologist, and builder based in Nepal. Open to remote roles in USA and Australia.',
  keywords: ['IT researcher', 'R&D associate', 'Nepal', 'remote work', 'data analysis', 'TaaS', 'portfolio', 'Umesh Bhurtel'],
  authors: [{ name: 'Umesh Bhurtel' }],
  openGraph: {
    title: 'Umesh Bhurtel — IT Researcher & R&D Associate',
    description: 'Research, projects, and bi-monthly insights from Bhaktapur, Nepal.',
    url: 'https://umeshbhurtel.com',
    type: 'website',
    siteName: 'Umesh Bhurtel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Umesh Bhurtel — IT Researcher & R&D Associate',
    description: 'Research, projects, and bi-monthly insights from Bhaktapur, Nepal.',
  },
  robots: {
    index: true,
    follow: true,
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <div className="grid-bg" aria-hidden="true" />
        <LoadingScreen />
        <SmoothScrollProvider />
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
