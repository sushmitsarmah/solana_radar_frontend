import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { WalletProviderComponent } from "@/components/WalletProvider";
import { Navigation } from "@/components/Navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pal Stakes",
  description: "Friendly Wagers on the Solana Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProviderComponent>
          <div className="container mx-auto px-4">
            <Navigation />
            <main>{children}</main>
          </div>
        </WalletProviderComponent>
      </body>
    </html>
  );
}
