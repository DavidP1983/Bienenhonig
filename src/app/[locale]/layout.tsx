import { routing } from "@/i18n/routing";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { Footer } from "@/widgets/Footer/ui";
import { Header } from "@/widgets/Header/ui";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "normalize.css";
import "../globals.css";

const museoSans = localFont({
  src: "../fonts/MuseoSansCyrl-300.woff",
  weight: "300",
  style: "normal",
  display: "swap",
  variable: "--font-museoSans",
});

const museoMono = localFont({
  src: "../fonts/MuseoSansCyrl-500.woff",
  weight: "500",
  style: "normal",
  display: "swap",
  variable: "--font-museoMono",
});

const museoBold = localFont({
  src: "../fonts/MuseoSansCyrl-700.woff",
  weight: "700",
  style: "normal",
  display: "swap",
  variable: "--font-museoBold",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

/* Заранее генерация параметров для en и ru при сборке */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("MainLayoutMetadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"
          async
        ></script>
      </head>
      <body
        className={`${museoSans.variable} ${museoMono.variable} ${museoBold.variable}`}
        id="body"
      >
        <div id="__next">
          <NextIntlClientProvider>
            <QueryProvider>
              <Header />
              <main id="main">{children}</main>
              <Footer />
            </QueryProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
