'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../lib/i18n/LanguageContext';

export interface Artwork {
  id: string;
  title: string;
  category: 'rotan' | 'ulin' | 'tenun' | 'pusaka';
  categoryLabel: string;
  origin: string;
  tribe: string;
  materials: string[];
  dimensions: string;
  craftingTime: string;
  description: string;
  story: string;
  imageUrl: string;
  artisan: {
    name: string;
    role: string;
    quote: string;
  };
}

const ARTWORKS_DATA: Artwork[] = [
  {
    id: 'anjat-rotan-benuaq',
    title: 'Tas Anjat Anyaman Rotan Halus',
    category: 'rotan',
    categoryLabel: 'Anyaman Rotan',
    origin: 'Kutai Barat, Kalimantan Timur',
    tribe: 'Suku Dayak Benuaq',
    materials: ['Rotan Segah Pilihan', 'Pewarna Alami Jernang Merah', 'Akar Kayu'],
    dimensions: 'Tinggi 38 cm, Diameter 24 cm',
    craftingTime: '3 - 4 Minggu Pengerjaan',
    description:
      'Tas silinder elastis khas Dayak dengan jalinan anyam heksagonal ultra-rapat yang tahan air dan memiliki kelenturan alami luar biasa.',
    story:
      'Anyaman Anjat bukan sekadar wadah pembawa bekal ke hutan rimba, melainkan lambang ketekunan dan kesabaran seorang perajin wanita Dayak. Pola geometrisnya merepresentasikan jalinan relasi manusia dengan roh pelindung hutan.',
    imageUrl:
      'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
    artisan: {
      name: 'Ibu Nenek Aren',
      role: 'Empu Anyam Generasi ke-4',
      quote: 'Rotan yang baik dipetik saat bulan susut, agar seratnya kuat dan tak lapuk dimakan masa.',
    },
  },
  {
    id: 'topeng-hudoq-ulin',
    title: 'Topeng Sakral Hudoq Kayu Ulin',
    category: 'ulin',
    categoryLabel: 'Ukiran Kayu Ulin',
    origin: 'Mahakam Ulu, Kalimantan Timur',
    tribe: 'Suku Dayak Bahau',
    materials: ['Kayu Ulin (Ironwood) Berusia Abad', 'Pigmen Alami Arang & Kapur'],
    dimensions: '45 cm x 30 cm x 18 cm',
    craftingTime: '6 Minggu Pemahatan',
    description:
      'Topeng ritual penyambutan musim tanam padi dengan paruh burung enggang dan ornamen taring naga yang dipahat dari kayu ulin besi tahan cuaca.',
    story:
      'Hudoq adalah wujud perwujudan roh pelindung tanaman dari serangan hama. Kayu ulin dipilih karena kekuatannya yang mampu bertahan ratusan tahun, menjadi saksi doa kemakmuran lintas generasi.',
    imageUrl:
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    artisan: {
      name: 'Pak Lawing Ding',
      role: 'Pemahat Adat Bahau',
      quote: 'Memahat ulin menuntut kita mendengarkan serat kayu, bukan memaksakan kehendak pisau.',
    },
  },
  {
    id: 'tenun-ulap-doyo',
    title: 'Kain Tenun Ulap Doyo Motif Belian',
    category: 'tenun',
    categoryLabel: 'Tenun Ikat Dayak',
    origin: 'Tanjung Isuy, Kutai Barat',
    tribe: 'Suku Dayak Benuaq',
    materials: ['Serat Daun Doyo Liar', 'Pewarna Alami Daun Tarum & Ubi Gadung'],
    dimensions: 'Panjang 210 cm, Lebar 65 cm',
    craftingTime: '2 Bulan Penenunan',
    description:
      'Kain tenun langka dari serat daun Doyo (Curculigo latifolia) yang tumbuh liar di pedalaman, ditenun dengan teknik lungsi tanpa mesin.',
    story:
      'Tradisi menenun Ulap Doyo telah diakui sebagai Warisan Budaya Takbenda. Setiap motif mencerminkan tingkatan adat dan kearifan menjaga hutan rawa tempat tanaman doyo bertunas.',
    imageUrl:
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
    artisan: {
      name: 'Mama Yohana',
      role: 'Penenun Senior Tanjung Isuy',
      quote: 'Mengambil daun doyo tidak boleh serakah; ambil daun tua agar rumpunnya tetap bertunas.',
    },
  },
  {
    id: 'mandau-pusaka-damaskus',
    title: 'Mandau Pusaka Bilah Pamor & Tanduk',
    category: 'pusaka',
    categoryLabel: 'Pusaka Tradisional',
    origin: 'Kapuas Hulu, Kalimantan Barat',
    tribe: 'Suku Dayak Iban & Ngaju',
    materials: ['Baja Tempaan Tradisional', 'Gagang Tanduk Rusa', 'Kompangan Kayu Ramin'],
    dimensions: 'Panjang Bilah 62 cm, Total 78 cm',
    craftingTime: '8 Minggu Penempaan & Ukir',
    description:
      'Senjata tradisional sakral dengan ukiran tembus krawangan pada punggung bilah dan hulu ukiran tanduk rusa bermotif aso (naga anjing mistis).',
    story:
      'Mandau bukan sekadar alat perlindungan, melainkan simbol martabat ksatria Dayak. Proses penempaannya diiringi ritual khusus agar membawa keberanian dan perlindungan bagi pemegangnya.',
    imageUrl:
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80',
    artisan: {
      name: 'Empu Jemat Anak Nyambar',
      role: 'Pandai Besi Mandau Iban',
      quote: 'Bilah mandau adalah cermin jiwa pemiliknya, harus selalu tajam dalam berpikir dan damai dalam bertindak.',
    },
  },
  {
    id: 'tikar-purun-geometris',
    title: 'Tikar Purun Anyam Geometris Belian',
    category: 'rotan',
    categoryLabel: 'Anyaman Rotan',
    origin: 'Banjarbaru, Kalimantan Selatan',
    tribe: 'Suku Dayak Bakumpai / Banjar',
    materials: ['Tanaman Purun Danau', 'Pewarna Tumbuhan Kesumba & Kunyit'],
    dimensions: '200 cm x 150 cm',
    craftingTime: '2 Minggu Pengerjaan',
    description:
      'Tikar anyaman purun dengan motif labirin geometris yang memberikan kesejukan alami pada lantai rumah tradisional.',
    story:
      'Purun dipanen dari lahan gambut basah dan ditumbuk secara manual hingga pipih sebelum dianyam. Produk ini adalah teladan pemanfaatan flora rawa gambut tanpa merusak ekosistem lahan basah.',
    imageUrl:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    artisan: {
      name: 'Ibu Salbiah',
      role: 'Ketua Kelompok Anyam Purun',
      quote: 'Gambut yang basah memberi kami purun yang subur. Menjaga gambut adalah menjaga dapur kami.',
    },
  },
  {
    id: 'rompi-manik-taa',
    title: 'Rompi Adat Ta’a & Manik Berundak',
    category: 'pusaka',
    categoryLabel: 'Pusaka Tradisional',
    origin: 'Apau Kayan, Kalimantan Utara',
    tribe: 'Suku Dayak Kenyah',
    materials: ['Manik Kaca Kuno Tradisional', 'Kain Bludru Hitam', 'Serat Kulit Kayu Talun'],
    dimensions: 'Ukuran All Size Dewasa',
    craftingTime: '5 Minggu Perangkaian Manik',
    description:
      'Pakaian adat kebesaran bangsawan Dayak Kenyah dengan susunan ribuan manik kaca warna-warni yang membentuk ornamen flora rimba dan figur leluhur.',
    story:
      'Warna manik memiliki makna simbolik: kuning melambangkan keagungan, merah keberanian, putih kesucian budi, dan hitam keteguhan hati.',
    imageUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    artisan: {
      name: 'Bungai Lian',
      role: 'Maestro Manik Apau Kayan',
      quote: 'Merangkai manik adalah menyusun harapan, butir demi butir menjadi satu kesatuan yang utuh.',
    },
  },
];

const BENTO_GROUP_SIZE = 6;

function chunkIntoBento<T>(items: T[], size = BENTO_GROUP_SIZE): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    groups.push(items.slice(i, i + size));
  }
  return groups;
}

const getBentoClasses = (index: number, groupLength: number) => {
  if (groupLength === 6) {
    if (index === 0) return 'md:col-span-4 md:row-span-2';
    if (index === 1) return 'md:col-span-2 md:row-span-1';
    if (index === 2) return 'md:col-span-2 md:row-span-1';
    if (index === 3) return 'md:col-span-2 md:row-span-1';
    if (index === 4) return 'md:col-span-4 md:row-span-2';
    if (index === 5) return 'md:col-span-2 md:row-span-1';
  }
  if (groupLength === 5) {
    if (index === 0) return 'md:col-span-4 md:row-span-2';
    if (index === 4) return 'md:col-span-4 md:row-span-1';
    return 'md:col-span-2 md:row-span-1';
  }
  if (groupLength === 4) {
    if (index === 0) return 'md:col-span-4 md:row-span-2';
    if (index === 3) return 'md:col-span-6 md:row-span-1';
    return 'md:col-span-2 md:row-span-1';
  }
  if (groupLength === 3) {
    if (index === 0) return 'md:col-span-4 md:row-span-2';
    return 'md:col-span-2 md:row-span-1';
  }
  if (groupLength === 2) {
    if (index === 0) return 'md:col-span-4 md:row-span-1';
    return 'md:col-span-2 md:row-span-1';
  }
  return 'md:col-span-6 md:row-span-1';
};

export default function ArtworksSection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalArtwork, setActiveModalArtwork] = useState<Artwork | null>(null);

  const categories = [
    { id: 'all', label: t('artworks.catAll') || 'Semua' },
    { id: 'rotan', label: t('artworks.catRotan') || 'Rotan' },
    { id: 'ulin', label: t('artworks.catUlin') || 'Ulin' },
    { id: 'tenun', label: t('artworks.catTenun') || 'Tenun' },
    { id: 'pusaka', label: t('artworks.catPusaka') || 'Pusaka' },
  ];

  const filteredArtworks = useMemo(() => {
    return ARTWORKS_DATA.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.tribe.toLowerCase().includes(q) ||
        item.origin.toLowerCase().includes(q) ||
        item.materials.some((m) => m.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const total = filteredArtworks.length;
  const bentoGroups = useMemo(() => chunkIntoBento(filteredArtworks), [filteredArtworks]);

  useEffect(() => {
    if (activeModalArtwork) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [activeModalArtwork]);

  useEffect(() => {
    if (!activeModalArtwork) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalArtwork(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeModalArtwork]);

  const modalIndex = activeModalArtwork
    ? filteredArtworks.findIndex((a) => a.id === activeModalArtwork.id)
    : -1;

  return (
    <section
      className="w-full bg-[var(--bg-primary)] border-t border-[var(--border-color)] py-24 md:py-32"
      id="karya-pilihan"
    >
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 pb-10 border-b border-[var(--border-color)]">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[var(--accent)] mb-4 block">
              {t('artworks.eyebrow')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] font-normal text-[var(--text-primary)] max-w-lg leading-[1.15]">
              {t('artworks.heading')}
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md font-light leading-relaxed">
            {t('artworks.description')}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-14">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-1 py-2 text-xs font-medium uppercase tracking-widest transition-colors duration-300 cursor-pointer focus:outline-none min-w-[60px] text-left
                  ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                  type="button"
                  aria-pressed={isActive}
                >
                  {cat.label}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-[var(--text-primary)] transition-all duration-300 ease-out
                    ${isActive ? 'w-full' : 'w-0'}`}
                  />
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <input
              type="text"
              placeholder={t('artworks.searchPlaceholder') || 'Cari koleksi'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-[var(--border-color)] pl-6 pr-6 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-primary)] transition-colors"
              aria-label={t('artworks.searchAria')}
            />
            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[16px] pointer-events-none">
              search
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] text-[16px] cursor-pointer"
                aria-label={t('artworks.clearSearch')}
                type="button"
              >
                close
              </button>
            )}
          </div>
        </div>

        {/* Gallery Bento Grid */}
        {total > 0 ? (
          <div className="flex flex-col gap-4 md:gap-5">
            {bentoGroups.map((group, gIdx) => (
              <div
                key={gIdx}
                className="grid grid-cols-1 md:grid-cols-6 auto-rows-[auto] md:auto-rows-[minmax(110px,auto)] gap-4 md:gap-5"
              >
                {group.map((item, i) => {
                  const globalIdx = gIdx * BENTO_GROUP_SIZE + i;
                  const isFeatured = globalIdx === 0;

                  return (
                    <article
                      key={item.id}
                      className={`${getBentoClasses(i, group.length)} min-h-[220px] md:min-h-0 relative flex flex-col group`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveModalArtwork(item)}
                        className="flex flex-col w-full h-full text-left cursor-pointer focus:outline-none group"
                        aria-label={`${t('artworks.detailBtn')}: ${item.title}`}
                      >
                        {isFeatured && (
                          <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--accent)] mb-2 font-medium block">
                            Featured / 01
                          </span>
                        )}

                        {/* Image Frame */}
                        <div className="relative w-full flex-1 overflow-hidden bg-[var(--bg-secondary)]">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover filter brightness-[0.94] saturate-[0.96] group-hover:brightness-105 group-hover:saturate-105 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none" />

                          <span className="absolute left-3 bottom-2.5 text-[9px] tracking-widest text-[var(--text-primary)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
                            {t('artworks.detailBtn') ? (t('artworks.detailBtn') as string).toUpperCase() : 'VIEW STORY'} →
                          </span>
                        </div>

                        {/* Animated Separator Line */}
                        <div className="w-full h-px bg-[var(--border-color)] mt-3 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[var(--text-primary)] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out origin-left" />
                        </div>

                        {/* Meta Data */}
                        <div className="flex flex-col gap-0.5 mt-2.5">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--accent)]">
                              {item.categoryLabel}
                            </span>
                            <span className="text-[8px] tracking-widest text-[var(--text-muted)] opacity-75 group-hover:opacity-100 transition-opacity">
                              {String(globalIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                            </span>
                          </div>
                          <h3 className="font-serif text-sm md:text-base text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent)] transition-colors">
                            {item.title}
                          </h3>
                          <span className="text-[9px] font-light text-[var(--text-muted)] mt-0.5">
                            {item.origin}
                          </span>
                        </div>
                      </button>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 border-t border-[var(--border-color)]">
            <h3 className="font-serif text-xl text-[var(--text-primary)] mb-2">
              {t('artworks.emptyTitle')}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto mb-6 font-light">
              {t('artworks.emptyBodyPrefix')} &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-medium uppercase tracking-widest text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-1 cursor-pointer hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              type="button"
            >
              {t('artworks.resetFilter')}
            </button>
          </div>
        )}
      </div>

      {/* Modal Detail */}
      {activeModalArtwork && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-6 bg-black/85 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-artwork-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalArtwork(null);
          }}
        >
          <div className="relative w-full max-w-6xl h-[100vh] md:h-auto md:max-h-[92vh] flex flex-col md:grid md:grid-cols-[1.1fr_1fr] bg-[var(--bg-primary)] overflow-y-auto animate-slide-up">

            <button
              onClick={() => setActiveModalArtwork(null)}
              className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors focus:outline-none cursor-pointer"
              aria-label={t('artworks.closeDialog')}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            <div className="relative bg-[var(--bg-secondary)] min-h-[40vh] md:min-h-0">
              <img
                src={activeModalArtwork.imageUrl}
                alt={activeModalArtwork.title}
                className="w-full h-full object-cover block"
              />
              <span className="absolute top-5 left-5 text-[10px] uppercase font-medium tracking-widest text-[var(--text-primary)] bg-[var(--bg-primary)]/60 backdrop-blur-sm px-3 py-1.5">
                {activeModalArtwork.categoryLabel}
              </span>
            </div>

            <div className="flex flex-col p-8 md:p-10 lg:p-12 text-[var(--text-primary)]">
              <div className="mb-7">
                <span className="text-[10px] tracking-widest text-[var(--text-muted)] block mb-2">
                  {modalIndex >= 0 ? String(modalIndex + 1).padStart(2, '0') : '01'} / {String(total || 1).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--accent)]">
                  {activeModalArtwork.tribe} &bull; {activeModalArtwork.origin}
                </span>
                <h3
                  id="modal-artwork-title"
                  className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal leading-[1.1] mt-2"
                >
                  {activeModalArtwork.title}
                </h3>
              </div>

              <p className="text-sm text-[var(--text-secondary)] font-light leading-relaxed mb-8">
                {activeModalArtwork.story}
              </p>

              <dl className="divide-y divide-[var(--border-color)] border-t border-[var(--border-color)] text-sm mb-8">
                <div className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] shrink-0">
                    {t('artworks.dimensi')}
                  </dt>
                  <dd className="text-right font-light">{activeModalArtwork.dimensions}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] shrink-0">
                    {t('artworks.waktu')}
                  </dt>
                  <dd className="text-right font-light">{activeModalArtwork.craftingTime}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] shrink-0">
                    {t('artworks.bahan')}
                  </dt>
                  <dd className="text-right font-light">
                    {activeModalArtwork.materials.join(' · ')}
                  </dd>
                </div>
              </dl>

              <div className="mt-auto border-l border-[var(--border-color)] pl-5 mb-8">
                <p className="text-sm italic font-light text-[var(--text-secondary)] leading-relaxed">
                  &ldquo;{activeModalArtwork.artisan.quote}&rdquo;
                </p>
                <span className="block text-[11px] uppercase tracking-widest text-[var(--text-muted)] mt-3">
                  {activeModalArtwork.artisan.name} &bull; {activeModalArtwork.artisan.role}
                </span>
              </div>

              <a
                href="#kontak"
                onClick={() => setActiveModalArtwork(null)}
                className="group w-full flex items-center justify-between border-t border-[var(--text-primary)] pt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
              >
                <span>{t('artworks.ctaAvailability')}</span>
                <span className="text-sm transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}