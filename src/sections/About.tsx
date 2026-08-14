export default function AboutSection() {
  const stats = [
    { number: '6', label: 'Wilayah Adat', desc: 'Tersebar di jantung hutan Kalimantan' },
    { number: '100+', label: 'Karya Terkurasi', desc: 'Mahakarya bernilai seni tinggi' },
    { number: '3', label: 'Generasi', desc: 'Pewarisan teknik tradisi murni' },
  ];

  return (
    <section
      className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
      id="tentang-kami"
    >
      {/* Bagian Atas: Header & Narasi Utama (Layout Asimetris) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
        
        {/* Kolom Kiri: Judul Besar */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-secondary" />
            <span className="font-label-caps text-label-caps text-secondary tracking-[0.3em] uppercase">
              Tentang Kami
            </span>
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary leading-tight">
            Menjaga Kebijaksanaan Leluhur melalui Sentuhan Tangan.
          </h2>
        </div>

        {/* Kolom Kanan: Paragraf Penjelasan */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 pt-2">
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Our organization bridges the raw, organic soul of Kalimantan craftsmanship with the
            disciplined aesthetic of a contemporary gallery. We believe that true luxury lies in time,
            patience, and the profound connection between the artisan and the earth.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant/80 leading-relaxed">
            Every piece tells a story of the forest, translated through generations of unspoken
            knowledge. We exist to ensure these stories continue to be told, honored, and integrated
            into modern spaces with absolute dignity.
          </p>
        </div>
      </div>

      {/* Bagian Bawah: Showcase Gambar Lebar & Grid Statistik Modern */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Gambar Utama dengan Lebar Penuh (Landscape/Cinematic) */}
        <div className="lg:col-span-7 relative group">
          <div
            aria-hidden="true"
            className="w-full aspect-[16/10] bg-cover bg-center object-cover border border-white/10 filter grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 shadow-2xl"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDP2vcPKeFLeYYmgA6toV2sx3DxDAVXAD3AmX9AQ-DoM3z8M048lt8KPLdfBLPFS9lyOF0epnFXzCzEAEVT8v-OlyqZ-2pE3RmjjjFbaaFQAsSZlHdJPOGMSHb3kwMjhzHaoyI7relNrZ2EwLd_w1NuKe4_eH9ourHZces8Eo7-yLWl1FcsqRZnvaruDIBqJCNORp9Bp-ek-cj-3B7oANoD2gbWgB8ZjpAf1NAmC6SLCgxdFVF9HX8r')`,
            }}
          />
          {/* Subtle Frame Accent */}
          <div className="absolute inset-0 border border-white/5 pointer-events-none m-3" />
        </div>

        {/* Statistik Berjajar ke Bawah yang Elegan */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:pl-8">
          {stats.map((stat, idx) => (
            <div 
              key={stat.label} 
              className={`flex items-start gap-6 ${
                idx !== stats.length - 1 ? 'pb-8 border-b border-white/10' : ''
              }`}
            >
              <span className="font-display-lg-mobile text-4xl md:text-5xl text-secondary font-light min-w-[70px]">
                {stat.number}
              </span>
              <div>
                <h3 className="font-label-caps text-label-caps text-primary tracking-wider mb-1 uppercase">
                  {stat.label}
                </h3>
                <p className="font-body-lg text-xs md:text-sm text-on-surface-variant/70">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}