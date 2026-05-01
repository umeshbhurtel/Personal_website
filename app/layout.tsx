import type { Metadata } from "next";
import "./globals.css";

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
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
