import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import "./globals.css";

const museoSans = localFont({
  src: './fonts/MuseoSansCyrl-300.woff',
  weight: "300",
  style: 'normal',
  display: 'swap',
  variable: '--font-museoSans'

})

const museoMono = localFont({
  src: './fonts/MuseoSansCyrl-500.woff',
  weight: "500",
  style: 'normal',
  display: 'swap',
  variable: '--font-museoMono'

})

const museoBold = localFont({
  src: './fonts/MuseoSansCyrl-700.woff',
  weight: "700",
  style: 'normal',
  display: 'swap',
  variable: '--font-museoBold'

})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}


export const metadata: Metadata = {
  title: "Bienenhonig - Pure Organic Honey",
  description: "Discover premium honey products directly from Germany.",
};

export interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link href="https://fonts.googleapis.com/css?family=Anonymous+Pro&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <body className={`${museoSans.variable} ${museoMono.variable} ${museoBold.variable}`} id="body">
        <Header />
        <div id="__next">
          <MantineProvider>
            {children}
          </MantineProvider>
        </div>
      </body>
    </html>
  );
}
