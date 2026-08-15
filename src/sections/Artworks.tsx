'use client';

import { useState, useMemo } from 'react';
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

export default function ArtworksSection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalArtwork, setActiveModalArtwork] = useState<Artwork | null>(null);

  const categories = [
    { id: 'all', label: t('artworks.catAll') },
    { id: 'rotan', label: t('artworks.catRotan') },
    { id: 'ulin', label: t('artworks.catUlin') },
    { id: 'tenun', label: t('artworks.catTenun') },
    { id: 'pusaka', label: t('artworks.catPusaka') },
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

  return (
    <section
      className="w-full bg-[var(--bg-primary)] border-t border-[var(--border-color)] py-24 md:py-36"
      id="karya-pilihan"
    >
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--accent)] mb-3 block">
            {t('artworks.eyebrow')}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[var(--text-primary)]">
            {t('artworks.heading')}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md font-light leading-relaxed">
          {t('artworks.description')}
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-12 pb-6 border-b border-[var(--border-color)]">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] transition-all duration-200 border rounded-[2px] cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] ${
                  isActive
                    ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] font-semibold'
                    : 'border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-color-strong)]'
                }`}
                type="button"
                aria-pressed={isActive}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <input
            type="text"
            placeholder={t('artworks.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2px] pl-9 pr-8 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
            aria-label={t('artworks.searchAria')}
          />
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-[16px] pointer-events-none">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] text-[15px] cursor-pointer"
              aria-label={t('artworks.clearSearch')}
              type="button"
            >
              close
            </button>
          )}
        </div>
      </div>

      {/* Artworks Grid */}
      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtworks.map((item) => (
            <article
              key={item.id}
              className="group border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden flex flex-col justify-between hover:border-[var(--border-color-strong)] transition-all duration-300 shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-tertiary)]">
                <div
                  className="w-full h-full bg-cover bg-center object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  style={{ backgroundImage: `url('${item.imageUrl}')` }}
                  role="img"
                  aria-label={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent opacity-80" />

                {/* Tribe Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 bg-[var(--overlay-scrim)] backdrop-blur-md border border-[var(--border-color)] text-[9px] uppercase font-semibold tracking-widest text-[var(--accent)]">
                    {item.tribe}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    {item.origin}
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2 font-light">
                    {item.description}
                  </p>

                  {/* Material Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.materials.slice(0, 2).map((mat, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 bg-white/5 border border-[var(--border-color)] text-[var(--text-secondary)]"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Detail Button */}
                <button
                  onClick={() => setActiveModalArtwork(item)}
                  className="w-full py-2.5 border border-[var(--border-color-strong)] bg-transparent hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] hover:border-[var(--text-primary)] text-[var(--text-primary)] text-xs font-medium uppercase tracking-[0.1em] transition-all duration-300 rounded-[2px] flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)]"
                  type="button"
                >
                  <span>{t('artworks.detailBtn')}</span>
                  <span className="text-sm">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 border border-[var(--border-color)] bg-[var(--bg-secondary)]">
          <span className="material-symbols-outlined text-3xl text-[var(--accent)] mb-3 block">
            search_off
          </span>
          <h3 className="font-serif text-lg text-[var(--text-primary)] mb-1">
            {t('artworks.emptyTitle')}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto mb-4 font-light">
            {t('artworks.emptyBodyPrefix')} &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-semibold uppercase tracking-wider rounded-[2px] cursor-pointer"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[var(--overlay-scrim)] backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-artwork-title"
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--bg-tertiary)] border border-[var(--border-color-strong)] rounded-xl shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setActiveModalArtwork(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-md bg-white/5 hover:bg-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] cursor-pointer"
              aria-label={t('artworks.closeDialog')}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-2">
              <div>
                <div className="overflow-hidden border border-[var(--border-color)] aspect-square relative bg-[var(--bg-tertiary)] rounded-md">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${activeModalArtwork.imageUrl}')` }}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-[var(--overlay-scrim)] backdrop-blur-md border border-[var(--border-color)] text-[9px] uppercase font-semibold text-[var(--accent)] tracking-wider">
                    {activeModalArtwork.categoryLabel}
                  </div>
                </div>

                <div className="mt-4 p-4 border border-[var(--border-color)] bg-[var(--bg-input)] rounded-md">
                  <div className="text-[11px] font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                    {activeModalArtwork.artisan.name} &bull; {activeModalArtwork.artisan.role}
                  </div>
                  <p className="text-xs italic text-[var(--text-secondary)] font-light">
                    &ldquo;{activeModalArtwork.artisan.quote}&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--accent)]">
                    {activeModalArtwork.tribe} &bull; {activeModalArtwork.origin}
                  </span>
                  <h3
                    id="modal-artwork-title"
                    className="font-serif text-2xl sm:text-3xl font-normal text-[var(--text-primary)] mt-1 mb-3"
                  >
                    {activeModalArtwork.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-light mb-4">
                    {activeModalArtwork.story}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-[var(--border-color)] text-xs font-light">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)] uppercase text-[10px] tracking-wider">
                      {t('artworks.dimensi')}:
                    </span>
                    <span className="text-[var(--text-primary)]">{activeModalArtwork.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)] uppercase text-[10px] tracking-wider">
                      {t('artworks.waktu')}:
                    </span>
                    <span className="text-[var(--text-primary)]">{activeModalArtwork.craftingTime}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] uppercase text-[10px] tracking-wider block mb-1">
                      {t('artworks.bahan')}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeModalArtwork.materials.map((m, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-white/5 text-[11px] text-[var(--accent)] border border-[var(--border-color)]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href="#kontak"
                    onClick={() => setActiveModalArtwork(null)}
                    className="w-full py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-widest text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2 rounded-[2px]"
                  >
                    <span>{t('artworks.ctaAvailability')}</span>
                    <span className="text-sm">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
