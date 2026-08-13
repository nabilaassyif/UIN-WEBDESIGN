export default function AboutSection() {
  const stats = [
    { number: '6', label: 'Wilayah Adat' },
    { number: '100+', label: 'Karya Terkurasi' },
    { number: '3', label: 'Generasi' },
  ];

  return (
    <section
      className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
      id="tentang-kami"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-16 items-start">
        {/* Image Section */}
        <div className="lg:col-span-5 relative">
          <div
            aria-hidden="true"
            className="w-full aspect-[3/4] bg-cover bg-center object-cover border border-white/10"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDP2vcPKeFLeYYmgA6toV2sx3DxDAVXAD3AmX9AQ-DoM3z8M048lt8KPLdfBLPFS9lyOF0epnFXzCzEAEVT8v-OlyqZ-2pE3RmjjjFbaaFQAsSZlHdJPOGMSHb3kwMjhzHaoyI7relNrZ2EwLd_w1NuKe4_eH9ourHZces8Eo7-yLWl1FcsqRZnvaruDIBqJCNORp9Bp-ek-cj-3B7oANoD2gbWgB8ZjpAf1NAmC6SLCgxdFVF9HX8r')`,
            }}
          />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-surface-container flex flex-col items-center justify-center border border-white/10 p-6 hidden md:flex">
            <span className="font-display-lg text-headline-lg text-secondary">50+</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant mt-2 text-center">
              Master Pengrajin
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-7 lg:pl-12 flex flex-col justify-center h-full pt-12 lg:pt-0">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-8">
            Menjaga Kebijaksanaan Leluhur melalui Sentuhan Tangan.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
            Our organization bridges the raw, organic soul of Kalimantan craftsmanship with the
            disciplined aesthetic of a contemporary gallery. We believe that true luxury lies in time,
            patience, and the profound connection between the artisan and the earth.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
            Every piece tells a story of the forest, translated through generations of unspoken
            knowledge. We exist to ensure these stories continue to be told, honored, and integrated
            into modern spaces.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="block font-display-lg-mobile text-headline-md text-primary mb-2">
                  {stat.number}
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}