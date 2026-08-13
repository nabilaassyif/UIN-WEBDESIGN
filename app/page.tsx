// Menggunakan relative path karena folder 'app' dan 'src' sejajar
import Header from "../src/components/Header";
import Hero from "../src/sections/Hero";
import About from "../src/sections/About";
import Footer from "../src/components/Footer";

// Kamu juga bisa mengimpor panel aksesibilitas jika ingin dipasang di halaman ini
// import AccessibilityPanel from "../src/components/accessibility/AccessibilityPanel";

export default function Home() {
  return (
    <>
      {/* Header akan berada di posisi paling atas */}
      <Header />

      {/* Main membungkus konten utama landing page */}
      <main className="flex flex-col min-h-screen">
        <Hero />
        <About />
        
        {/* Nanti kamu bisa tambahkan section lain di sini seperti Timeline, dll */}
      </main>

      {/* Footer di posisi paling bawah */}
      <Footer />

      {/* Panel Aksesibilitas (Opsional: hapus komentar jika komponen sudah siap) */}
      {/* <AccessibilityPanel /> */}
    </>
  );
}