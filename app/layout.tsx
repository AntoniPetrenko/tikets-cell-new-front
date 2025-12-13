import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ClientLayout } from "./components/ClientLayout/ClientLayout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "AutoMerchClub",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased flex flex-col min-h-screen bg-gray-900 text-white`}
      >
        <ClientLayout children={children} />
        {/* <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <GlobalModal /> */}
      </body>
    </html>
  );
}
