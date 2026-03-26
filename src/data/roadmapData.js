export const roadmapBusinessProfile = {
  name: 'Kopi Nusantara',
  type: 'Coffee Shop',
  mainProducts: ['Latte', 'Cappuccino'],
}

export const roadmapProgress = {
  percent: 60,
  statusLabel: 'Selesai',
  title: 'Progress Bisnis',
  description: 'Anda hampir mencapai tahap scaling.',
}

export const roadmapStages = [
  {
    id: 'product-validation',
    title: 'Validasi Produk',
    status: 'completed',
    statusLabel: 'Selesai',
  },
  {
    id: 'branding',
    title: 'Branding',
    status: 'active',
    statusLabel: 'Sedang Berjalan',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    status: 'locked',
    statusLabel: 'Terkunci',
  },
  {
    id: 'scaling-business',
    title: 'Scaling Business',
    status: 'locked',
    statusLabel: 'Terkunci',
  },
]

export const defaultRoadmapStageId = 'product-validation'

export const roadmapStageDetails = {
  'product-validation': {
    label: 'Stage: Validasi Produk',
    badge: 'Stage Dipilih',
    tasks: [
      {
        id: 'validation-menu',
        title: 'Tentukan dua produk utama yang paling sering dibeli',
        completed: true,
      },
      {
        id: 'validation-feedback',
        title: 'Catat masukan pelanggan tentang rasa dan harga',
        completed: true,
      },
      {
        id: 'validation-best-seller',
        title: 'Bandingkan produk paling laku selama 7 hari terakhir',
        completed: false,
      },
    ],
    ctaLabel: 'Selesaikan Validasi',
    learning: {
      type: 'internal',
      title: 'Tutorial Internal TUMBUH',
      description:
        'Tahap ini akan disinkronkan dengan tutorial onboarding TUMBUH agar pengguna memahami fitur inti sebelum lanjut ke roadmap bisnis.',
      note: 'Tutorial internal akan tersedia di sini.',
    },
    summary: {
      eyebrow: 'Ringkasan Validasi',
      metrics: [
        {
          id: 'top-product',
          label: 'Produk Terlaris',
          value: 'Latte',
          tone: 'neutral',
          helper: 'Paling sering dibeli pelanggan tetap',
        },
        {
          id: 'repeat-orders',
          label: 'Repeat Order',
          value: '+9.4%',
          tone: 'positive',
          helper: 'Naik setelah menu utama dipertegas',
        },
      ],
      recommendationTitle: 'Rekomendasi Tahap Berikutnya',
      recommendationText:
        'Validasi produk menunjukkan latte dan cappuccino cukup kuat. Setelah ini, arahkan bisnis ke tahap branding agar identitas menu dan komunikasi visual lebih konsisten.',
    },
  },
  branding: {
    label: 'Stage: Branding Checklist',
    badge: 'Stage Dipilih',
    tasks: [
      {
        id: 'brand-menu',
        title: 'Tentukan menu utama',
        completed: true,
      },
      {
        id: 'brand-audience',
        title: 'Identifikasi target pelanggan',
        completed: true,
      },
      {
        id: 'brand-best-seller',
        title: 'Analisis produk paling laku',
        completed: false,
      },
    ],
    ctaLabel: 'Selesaikan Analisis',
    learning: {
      type: 'external',
      title: 'Referensi Belajar Branding',
      description:
        'Kumpulan artikel ini bisa membantu coffee shop kecil membangun identitas brand yang lebih konsisten dan mudah diingat pelanggan.',
      resources: [
        {
          id: 'branding-1',
          title: 'Pentingnya Branding untuk Bisnis Kopi',
          source: 'Moka POS',
          summary:
            'Memahami mengapa identitas unik sangat krusial bagi kedai kopi di tengah persaingan ketat.',
          href: 'https://www.mokapos.com/blog/pentingnya-branding-untuk-bisnis-kopi',
        },
        {
          id: 'branding-2',
          title: 'Tips Branding Bisnis Kuliner Modal Kecil',
          source: 'GrabMerchant',
          summary:
            'Cara membangun citra profesional untuk usaha makanan tanpa biaya besar.',
          href: 'https://www.grab.com/id/merchant/blog/branding-bisnis-kuliner/',
        },
        {
          id: 'branding-3',
          title: 'Membangun Brand Voice untuk Bisnis',
          source: 'iSeller',
          summary:
            'Panduan menentukan gaya bahasa dan karakter unik brand Anda saat berinteraksi dengan pelanggan.',
          href: 'https://www.isellercommerce.com/id/blog/apa-itu-brand-voice-dan-cara-membangunnya',
        },
        {
          id: 'branding-4',
          title: '6 Cara Membangun Loyalitas Merek',
          source: 'Jurnal.id',
          summary:
            'Strategi praktis untuk membuat pelanggan merasa terikat dan selalu kembali ke bisnis Anda.',
          href: 'https://www.jurnal.id/id/blog/6-cara-ampuh-membangun-loyalitas-merek/',
        },
        {
          id: 'branding-5',
          title: 'How to Brand Your Coffee Shop',
          source: 'Coffee Shop Startups',
          summary:
            'Edukasi menyeluruh tentang elemen branding dari interior kedai hingga pengalaman pelanggan.',
          href: 'https://coffeeshopstartups.com/brand-your-coffee-shop-startup/',
        },
      ],
    },
    summary: {
      eyebrow: 'Ringkasan Sales',
      metrics: [
        {
          id: 'revenue',
          label: 'Total Revenue',
          value: '+12.5%',
          tone: 'positive',
          helper: 'Naik dibanding bulan lalu',
        },
        {
          id: 'basket',
          label: 'Avg. Basket',
          value: 'Rp 42.000',
          tone: 'neutral',
          helper: 'Nilai pembelian rata-rata',
        },
      ],
      recommendationTitle: 'Rekomendasi Tahap Berikutnya',
      recommendationText:
        'Perkuat branding menu andalan dan konsistensi komunikasi visual agar bisnis lebih siap masuk ke tahap digital marketing.',
    },
  },
  'digital-marketing': {
    label: 'Stage: Digital Marketing Plan',
    badge: 'Stage Dipilih',
    tasks: [
      {
        id: 'marketing-channel',
        title: 'Pilih kanal promosi utama yang paling relevan',
        completed: false,
      },
      {
        id: 'marketing-content',
        title: 'Siapkan konten promo untuk produk andalan',
        completed: false,
      },
      {
        id: 'marketing-offer',
        title: 'Uji promo sederhana untuk jam penjualan sepi',
        completed: false,
      },
    ],
    ctaLabel: 'Mulai Rencana Promosi',
    learning: {
      type: 'external',
      title: 'Referensi Belajar Digital Marketing',
      description:
        'Artikel ini dipilih untuk membantu UMKM memahami promosi digital yang realistis dan relevan untuk bisnis kopi.',
      resources: [
        {
          id: 'marketing-1',
          title: '8 Strategi Pemasaran Coffee Shop Efektif',
          source: 'Majoo',
          summary:
            'Daftar taktik pemasaran kreatif yang dirancang khusus untuk meningkatkan penjualan kedai kopi.',
          href: 'https://majoo.id/solusi/blog/strategi-pemasaran-coffee-shop-yang-efektif',
        },
        {
          id: 'marketing-2',
          title: 'Instagram Marketing untuk Bisnis Kuliner',
          source: 'Niagahoster',
          summary:
            'Langkah mudah memaksimalkan Instagram untuk mempromosikan produk makanan secara visual.',
          href: 'https://www.niagahoster.co.id/blog/instagram-marketing-untuk-bisnis-kuliner/',
        },
        {
          id: 'marketing-3',
          title: 'Pentingnya Google My Business untuk UMKM',
          source: 'Gojek',
          summary:
            'Cara mendaftarkan bisnis di Google agar muncul di hasil pencarian lokal dan peta.',
          href: 'https://www.gojek.com/id-id/blog/mitra-usaha/google-my-business-adalah/',
        },
        {
          id: 'marketing-4',
          title: 'Pemasaran Lewat WhatsApp Marketing',
          source: 'Midtrans',
          summary:
            'Tips menggunakan WhatsApp sebagai alat promosi yang personal namun profesional.',
          href: 'https://midtrans.com/id/blog/whatsapp-marketing-untuk-bisnis',
        },
        {
          id: 'marketing-5',
          title: 'Social Media Marketing for Restaurants',
          source: 'Sprout Social',
          summary:
            'Panduan strategis menggunakan berbagai platform media sosial untuk industri F&B.',
          href: 'https://sproutsocial.com/insights/social-media-for-restaurants/',
        },
      ],
    },
    summary: {
      eyebrow: 'Insight Promosi',
      metrics: [
        {
          id: 'reach',
          label: 'Potensi Reach',
          value: '2.1K',
          tone: 'neutral',
          helper: 'Perkiraan jangkauan mingguan lokal',
        },
        {
          id: 'engagement',
          label: 'Respon Promo',
          value: '+6.8%',
          tone: 'positive',
          helper: 'Simulasi berdasarkan data penjualan saat ini',
        },
      ],
      recommendationTitle: 'Rekomendasi Tahap Berikutnya',
      recommendationText:
        'Fokuskan promosi pada produk yang sudah tervalidasi. Gunakan branding yang konsisten agar promosi digital tidak terasa acak dan lebih mudah dikenali pelanggan.',
    },
  },
  'scaling-business': {
    label: 'Stage: Scaling Business Plan',
    badge: 'Stage Dipilih',
    tasks: [
      {
        id: 'scaling-capacity',
        title: 'Hitung kapasitas operasional sebelum meningkatkan volume',
        completed: false,
      },
      {
        id: 'scaling-hiring',
        title: 'Siapkan SOP sederhana untuk tim tambahan',
        completed: false,
      },
      {
        id: 'scaling-expansion',
        title: 'Evaluasi peluang ekspansi menu atau lokasi',
        completed: false,
      },
    ],
    ctaLabel: 'Susun Rencana Scaling',
    learning: {
      type: 'external',
      title: 'Referensi Belajar Scaling Business',
      description:
        'Referensi berikut membantu UMKM membaca kesiapan ekspansi, merapikan SOP, dan menjaga kesehatan bisnis saat bertumbuh.',
      resources: [
        {
          id: 'scaling-1',
          title: 'Strategi Ekspansi Bisnis Kuliner',
          source: 'Moka POS',
          summary:
            'Panduan mengevaluasi kesiapan bisnis sebelum membuka cabang atau memperluas pasar.',
          href: 'https://www.mokapos.com/blog/ekspansi-bisnis-kuliner',
        },
        {
          id: 'scaling-2',
          title: 'Tips Membuat SOP Bisnis Food & Beverage',
          source: 'Majoo',
          summary:
            'Pentingnya standarisasi operasional agar kualitas produk tetap terjaga saat bisnis membesar.',
          href: 'https://majoo.id/solusi/blog/sop-restoran-adalah',
        },
        {
          id: 'scaling-3',
          title: 'Cara Kelola Keuangan untuk Skala Bisnis',
          source: 'KoinWorks',
          summary:
            'Tips manajemen keuangan bagi UMKM yang sedang dalam fase pertumbuhan cepat.',
          href: 'https://koinworks.com/blog/mengelola-keuangan-bisnis-umkm/',
        },
        {
          id: 'scaling-4',
          title: 'Mengenal Model Bisnis Waralaba',
          source: 'Niagahoster',
          summary:
            'Memahami skema kemitraan atau franchise sebagai opsi percepatan ekspansi bisnis.',
          href: 'https://www.niagahoster.co.id/blog/bisnis-franchise/',
        },
        {
          id: 'scaling-5',
          title: 'Maintaining Quality While Scaling',
          source: 'Roast Magazine',
          summary:
            'Cara menjaga kualitas produk kopi dan budaya kerja saat kedai kopi mulai berkembang.',
          href: 'https://dailycoffeenews.com/2018/06/11/maintaining-quality-and-culture-while-scaling-your-coffee-business/',
        },
      ],
    },
    summary: {
      eyebrow: 'Growth Outlook',
      metrics: [
        {
          id: 'capacity',
          label: 'Kapasitas Saat Ini',
          value: '78%',
          tone: 'neutral',
          helper: 'Masih ada ruang untuk peningkatan',
        },
        {
          id: 'growth-potential',
          label: 'Potensi Growth',
          value: '+22%',
          tone: 'positive',
          helper: 'Jika operasional dan promosi sudah stabil',
        },
      ],
      recommendationTitle: 'Rekomendasi Tahap Berikutnya',
      recommendationText:
        'Jangan terburu masuk ke scaling sebelum validasi produk, branding, dan promosi sudah menunjukkan pola yang konsisten. Gunakan data transaksi untuk membaca kesiapan bisnis.',
    },
  },
}


