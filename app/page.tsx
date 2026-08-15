import Header from "../src/components/Header";
import Hero from "../src/sections/Hero";
import About from "../src/sections/About";
import Artworks from "../src/sections/Artworks";
import Programs from "../src/sections/Programs";
import Documentation from "../src/sections/Documentation";
import Contact from "../src/sections/Contact";
import Footer from "../src/components/Footer";
import ScrollFadeSection from "../src/components/ScrollFadeSection";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-col min-h-screen w-full bg-[var(--bg-primary)]">
        <ScrollFadeSection>
          <Hero />
        </ScrollFadeSection>

        <ScrollFadeSection>
          <About />
        </ScrollFadeSection>

        <ScrollFadeSection>
          <Artworks />
        </ScrollFadeSection>

        <ScrollFadeSection>
          <Programs />
        </ScrollFadeSection>

        <ScrollFadeSection>
          <Documentation />
        </ScrollFadeSection>

        <ScrollFadeSection>
          <Contact />
        </ScrollFadeSection>
      </main>

      <ScrollFadeSection>
        <Footer />
      </ScrollFadeSection>
    </>
  );
}