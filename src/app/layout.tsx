import { Header } from "@/components/Header";
import type { Metadata, Viewport } from "next";
import dynamic from 'next/dynamic';
import localFont from "next/font/local";
import 'normalize.css';
import "./globals.css";

const MantineProvider = dynamic(() => import('@mantine/core').then(mod => mod.MantineProvider), {
  ssr: false, // Отключает SSR для стилей
});

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
        <link rel="preload" href="https://fonts.googleapis.com/css?family=Anonymous+Pro&display=swap" as="style" />
        <link href="https://fonts.googleapis.com/css?family=Anonymous+Pro&display=swap" rel="stylesheet" />
        <link rel="preload" href="https://fonts.googleapis.com/icon?family=Material+Icons" as="style"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <link rel="preload" href="/stylesheets/font-awesome.min.css" as="style" />
        <link rel="stylesheet" href="/stylesheets/font-awesome.min.css" />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js" async></script>
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
