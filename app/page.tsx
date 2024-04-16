import Image from "next/image";
import PrismaLogo from '@/public/prisma-logo-2.jpg';
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import Services from "./components/Services";
import Team from "./components/Team";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Phrase from "./components/Phrase";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Brands />
      <Services />
      {/* <Team /> */}
      <Phrase />
      <Products />
      <Contact />
    </main>
  );
}
