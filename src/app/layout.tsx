import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { theme } from "@/config/theme.config";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(theme.siteUrl),
  title: {
    default: `${theme.brand} — ${theme.tagline}`,
    template: `%s · ${theme.brand}`,
  },
  description:
    "Joias autorais feitas à mão em ouro 18k e pedras naturais. Veja a coleção e fale direto com o atelier.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: theme.brand,
    title: `${theme.brand} — ${theme.tagline}`,
    description: "Joias autorais feitas à mão em ouro 18k e pedras naturais.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ScrollProgress />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
