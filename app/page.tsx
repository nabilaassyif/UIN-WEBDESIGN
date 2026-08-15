import Header from "../src/components/Header";
import Hero from "../src/sections/Hero";
import About from "../src/sections/About";
import Artworks from "../src/sections/Artworks";
import Programs from "../src/sections/Programs";
import Documentation from "../src/sections/Documentation";
import Contact from "../src/sections/Contact";
import Footer from "../src/components/Footer";

export default function Home() {
  return (
    <>
      {/* Header Sticky Navigation */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex flex-col min-h-screen w-full bg-[var(--bg-primary)]">
        <Hero />
        <About />
        <Artworks />
        <Programs />
        <Documentation />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}