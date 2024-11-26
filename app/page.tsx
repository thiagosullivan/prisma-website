import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Phrase from "./components/Phrase";
import Products from "./components/Products";
import Services from "./components/Services";
import Team from "./components/Team";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Phrase />
      {/* <Brands /> */}
      <Services />
      <Team />
      <Products />
      <Contact />
    </main>
  );
}
