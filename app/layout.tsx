import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prisma - Acessórios para Construção",
  description: "Prisma, excelência em acessórios plásticos para construção, destaca-se pelos Niveladores de Piso que unem qualidade, rapidez e confiança.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
