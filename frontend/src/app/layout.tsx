import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const JostSans = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { template: "%s | CabinCare", default: "CabinCare" },
  description: "CabinCare, Where we really care about your logistics!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${JostSans.className} antialiased h-screen bg-cusgreen`}
      >
        {children}
      </body>
    </html>
  );
}
