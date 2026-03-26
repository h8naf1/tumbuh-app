import {
  applyDraftCorrection,
  buildDraftFromAttachment,
  buildDraftFromScanner,
  parseSalesInstruction,
  summarizeDraftItems,
} from './chatDrafts.js'
import { inventorySnapshot, salesRecords } from './assistantKnowledge.js'

export const conversationModes = {
  chat: {
    context: {
      modeLabel: 'Chat Generatif',
      description:
        'Mulai dengan salam, pertanyaan bisnis, atau instruksi transaksi. Saya akan menyesuaikan alurnya dari intent percakapan Anda.',
    },
    composerLabel: 'Mode chat aktif',
    composerHint:
      'Tulis seperti sedang bicara dengan asisten usaha. Saya bisa menyapa, memberi insight, atau menyiapkan draft transaksi sesuai maksud Anda.',
  },
  upload: {
    context: {
      modeLabel: 'Upload Nota',
      description:
        'Gunakan tombol Upload Nota di composer, lalu tambahkan catatan singkat bila ingin hasil parsing awal lebih jelas.',
    },
    composerLabel: 'Mode upload aktif',
    composerHint:
      'Upload file lebih dulu, lalu kirim catatan tambahan seperti tanggal, pemasok, atau jenis nota supaya hasilnya lebih rapi.',
  },
  scan: {
    context: {
      modeLabel: 'Scan Barcode',
      description:
        'Pilih hasil scan untuk membuat draft transaksi awal, lalu lanjutkan koreksi lewat percakapan yang sama.',
    },
    composerLabel: 'Mode scan aktif',
    composerHint:
      'Setelah hasil scan dipilih, Anda bisa melanjutkan dengan instruksi seperti "jadi 2 item" atau "tambah 1 latte".',
  },
}

const greetingKeywords = ['halo', 'hai', 'hi', 'pagi', 'siang', 'sore', 'malam', 'permisi']
const businessKeywords = [
  'bisnis',
  'usaha',
  'jualan',
  'promosi',
  'marketing',
  'pelanggan',
  'omzet',
  'omset',
  'strategi',
  'target market',
  'pasar',
  'naik',
  'laris',
  'sepi',
  'harga',
  'margin',
  'profit',
  'untung',
  'operasional',
  'efisiensi',
  'berkembang',
  'growth',
]

function formatRupiah(amount) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`
}

function hasAnyKeyword(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword))
}

function isGreeting(text = '') {
  const trimmedText = text.trim()

  return trimmedText.length > 0 && (
    greetingKeywords.includes(trimmedText) ||
    hasAnyKeyword(text, greetingKeywords)
  )
}

function isStockQuestion(text = '') {
  return text.includes('stok') || text.includes('stock') || text.includes('restock')
}

function isSalesSummaryQuestion(text = '') {
  return (
    text.includes('ringkasan') ||
    text.includes('pendapatan') ||
    text.includes('penjualan hari ini') ||
    text.includes('transaksi hari ini') ||
    text.includes('laporan penjualan')
  )
}

function isBusinessQuestion(text = '') {
  return hasAnyKeyword(text, businessKeywords)
}

function detectBusinessTopic(text = '') {
  if (text.includes('promosi') || text.includes('marketing') || text.includes('pelanggan')) {
    return 'marketing'
  }

  if (text.includes('harga') || text.includes('margin') || text.includes('profit') || text.includes('untung')) {
    return 'pricing'
  }

  if (text.includes('operasional') || text.includes('efisiensi') || text.includes('proses')) {
    return 'operations'
  }

  if (text.includes('stok') || text.includes('stock') || text.includes('restock')) {
    return 'stock'
  }

  if (
    text.includes('ringkasan') ||
    text.includes('pendapatan') ||
    text.includes('penjualan') ||
    text.includes('transaksi hari ini')
  ) {
    return 'sales_summary'
  }

  return 'growth'
}

function buildBusinessSnapshot() {
  const validRecords = salesRecords.filter((record) => record.status !== 'Dibatalkan')
  const validRevenue = validRecords.reduce((sum, record) => sum + record.total, 0)
  const pendingCount = salesRecords.filter(
    (record) => record.status === 'Proses' || record.status === 'Menunggu',
  ).length
  const lowStockItems = inventorySnapshot.filter((item) => item.stock <= 5)
  const quantityByProduct = new Map()

  salesRecords.forEach((record) => {
    quantityByProduct.set(
      record.productName,
      (quantityByProduct.get(record.productName) ?? 0) + record.quantity,
    )
  })

  const bestSellerEntry = [...quantityByProduct.entries()].sort((a, b) => b[1] - a[1])[0]
  const bestSellerName = bestSellerEntry?.[0] ?? 'belum ada data'
  const averageTicket = validRecords.length > 0 ? Math.round(validRevenue / validRecords.length) : 0

  return {
    validRevenue,
    pendingCount,
    lowStockItems,
    bestSellerName,
    averageTicket,
  }
}

export function detectIntent({ userText, attachmentName, pendingDraft }) {
  const normalizedText = userText.toLowerCase().trim()

  if (pendingDraft) {
    const correctionResult = applyDraftCorrection(userText, pendingDraft)
    if (correctionResult) {
      return {
        type: 'draft_correction',
        correctionResult,
      }
    }
  }

  if (attachmentName) {
    return { type: 'attachment_input' }
  }

  const chatDraft = parseSalesInstruction(userText)
  if (chatDraft) {
    return {
      type: 'transaction_input',
      chatDraft,
    }
  }

  if (isGreeting(normalizedText)) {
    return { type: 'greeting' }
  }

  if (isStockQuestion(normalizedText)) {
    return {
      type: 'business_question',
      topic: 'stock',
    }
  }

  if (isSalesSummaryQuestion(normalizedText)) {
    return {
      type: 'business_question',
      topic: 'sales_summary',
    }
  }

  if (isBusinessQuestion(normalizedText)) {
    return {
      type: 'business_question',
      topic: detectBusinessTopic(normalizedText),
    }
  }

  return { type: 'unknown' }
}

function createGreetingFlowResult() {
  return {
    mode: 'chat',
    context: {
      modeLabel: 'Salam Awal',
      description:
        'Percakapan dimulai santai. Saya siap mengarahkan user ke insight bisnis atau pencatatan transaksi, tergantung kebutuhan berikutnya.',
    },
    assistantText:
      'Halo, saya siap bantu hari ini. Kita bisa bahas kondisi bisnis, cek stok, ringkas penjualan, atau langsung buat draft transaksi.\n\nAnda mau mulai dari insight bisnis dulu atau mau catat transaksi baru?',
  }
}

function createTransactionFlowResult(chatDraft) {
  const itemSummary = summarizeDraftItems(chatDraft.items)

  return {
    mode: 'chat',
    context: {
      modeLabel: 'Draft Transaksi',
      description:
        'Saya menangkap instruksi transaksi dari percakapan dan mengubahnya menjadi draft yang siap Anda cek sebelum disimpan.',
    },
    draft: chatDraft,
    assistantText: `Siap, saya tangkap ${itemSummary}. Saya buatkan draft transaksi di bawah dulu supaya Anda bisa cek dengan cepat.\n\nKalau ada yang mau diubah, cukup bilang seperti "hapus cappuccino" atau "jadi 3 item".`,
  }
}

function createAttachmentFlowResult(attachmentName) {
  const draft = buildDraftFromAttachment(attachmentName)

  return {
    mode: 'upload',
    context: {
      modeLabel: 'Upload Nota',
      fileName: attachmentName,
      description:
        'File upload sudah masuk ke alur chat. Saya siapkan draft awal agar bisa direview sebelum disimpan.',
    },
    draft,
    assistantText: `File ${attachmentName} sudah saya terima. Saya buatkan draft awal dari nota itu supaya Anda bisa review dulu di bawah.\n\nKalau ada detail yang ingin dibetulkan, tinggal beri tahu saya dan kita rapikan bareng.`,
  }
}

function createStockFlowResult(userText) {
  const normalizedText = userText.toLowerCase()
  const matchedProduct = inventorySnapshot.find((item) => normalizedText.includes(item.keyword))

  if (matchedProduct) {
    return {
      mode: 'chat',
      context: {
        modeLabel: 'Insight Stok',
        description: 'Saya sedang membaca snapshot stok untuk menjawab pertanyaan yang spesifik ke produk tertentu.',
      },
      assistantText: `Saya cek stok ${matchedProduct.name}. Saat ini masih ada ${matchedProduct.stock} item dengan harga ${formatRupiah(matchedProduct.price)} per produk.\n\nKalau produk ini termasuk andalan, saya sarankan mulai siapkan restock sebelum turun lebih jauh. Mau saya cek produk lain yang paling rawan juga?`,
    }
  }

  const lowStockItems = inventorySnapshot.filter((item) => item.stock <= 5)
  const stockSummary = inventorySnapshot
    .map((item) => `${item.name} ${item.stock} item`)
    .join(', ')

  return {
    mode: 'chat',
    context: {
      modeLabel: 'Insight Stok',
      description: 'Saya merangkum snapshot stok terbaru supaya Anda cepat melihat mana yang aman dan mana yang mulai riskan.',
    },
    assistantText: lowStockItems.length > 0
      ? `Saya cek snapshot stok Anda. Yang paling perlu perhatian sekarang adalah ${lowStockItems.map((item) => `${item.name} tersisa ${item.stock} item`).join(', ')}. Produk lain yang tercatat saat ini: ${stockSummary}.\n\nKalau mau, saya bisa bantu urutkan mana yang paling prioritas untuk direstock duluan.`
      : `Saya cek snapshot stok saat ini dan semuanya masih relatif aman: ${stockSummary}.\n\nKalau Anda mau, saya bisa lanjut bantu cari produk mana yang paling layak didorong penjualannya.`,
  }
}

function createSalesSummaryFlowResult() {
  const snapshot = buildBusinessSnapshot()

  return {
    mode: 'chat',
    context: {
      modeLabel: 'Ringkasan Penjualan',
      description: 'Saya sedang merangkum snapshot penjualan demo agar mudah dibaca dan langsung bisa ditindaklanjuti.',
    },
    assistantText: `Saya rangkum penjualan hari ini dulu ya. Ada ${salesRecords.length} transaksi tercatat, ${formatRupiah(snapshot.validRevenue)} pendapatan dari transaksi non-dibatalkan, dan ${snapshot.pendingCount} transaksi masih perlu ditindaklanjuti. Produk yang paling sering muncul saat ini adalah ${snapshot.bestSellerName}.\n\nKalau mau, saya bisa lanjut bantu baca peluangnya: fokus ke promosi, stok, atau follow-up transaksi pending?`,
  }
}

function createBusinessInsightFlowResult(topic) {
  const snapshot = buildBusinessSnapshot()
  const lowStockLead = snapshot.lowStockItems[0]
  const lowStockText = lowStockLead
    ? `${lowStockLead.name} mulai tipis di ${lowStockLead.stock} item`
    : 'stok produk inti masih cukup aman'

  if (topic === 'marketing') {
    return {
      mode: 'chat',
      context: {
        modeLabel: 'Insight Bisnis',
        description: 'Saya sedang memberi insight pemasaran berdasarkan produk yang paling sering terjual dan kondisi stok saat ini.',
      },
      assistantText: `Kalau fokus Anda ke pemasaran, saya akan mulai dari produk yang sudah terbukti laku dulu. Saat ini ${snapshot.bestSellerName} paling sering muncul di transaksi, jadi itu kandidat kuat untuk dijadikan produk penarik. Di sisi lain, ${lowStockText}, jadi promosi jangan terlalu agresif kalau stok belum siap.\n\nSekarang Anda lebih ingin menaikkan jumlah transaksi, repeat order, atau nilai belanja per pelanggan?`,
    }
  }

  if (topic === 'pricing') {
    return {
      mode: 'chat',
      context: {
        modeLabel: 'Insight Bisnis',
        description: 'Saya sedang memberi sudut pandang harga dan margin agar keputusan penyesuaian tidak terasa asal naik atau turun.',
      },
      assistantText: `Kalau bicara harga, saya tidak sarankan ubah semuanya sekaligus. Mulai dari produk yang paling sering dibeli, yaitu ${snapshot.bestSellerName}, lalu lihat apakah Anda ingin menaikkan margin atau justru menjaga volume penjualan. Rata-rata nilai transaksi yang tercatat sekarang sekitar ${formatRupiah(snapshot.averageTicket)}.\n\nAnda ingin saya bantu pikirkan strategi bundling, upsell, atau evaluasi harga produk tertentu?`,
    }
  }

  if (topic === 'operations') {
    return {
      mode: 'chat',
      context: {
        modeLabel: 'Insight Bisnis',
        description: 'Saya sedang melihat area operasional yang bisa dibenahi lebih dulu agar alur usaha terasa lebih ringan.',
      },
      assistantText: `Dari sisi operasional, yang paling dekat untuk dibenahi sekarang adalah ${snapshot.pendingCount} transaksi yang masih tertahan. Biasanya ini berdampak ke follow-up pelanggan dan ritme kerja harian. Selain itu, ${lowStockText}, jadi alur restock juga patut diperhatikan.\n\nAnda mau saya bantu fokus ke follow-up transaksi, kerapian stok, atau pencatatan transaksi harian?`,
    }
  }

  return {
    mode: 'chat',
    context: {
      modeLabel: 'Insight Bisnis',
      description: 'Saya sedang memberi gambaran menyeluruh agar diskusi bisnis terasa lebih terarah, bukan sekadar jawaban satu arah.',
    },
    assistantText: `Kalau tujuan Anda mengembangkan bisnis, saya biasanya mulai dari tiga titik: produk paling laku, stok yang mulai menipis, dan transaksi yang masih tertahan. Saat ini ${snapshot.bestSellerName} terlihat paling kuat, ${lowStockText}, dan ada ${snapshot.pendingCount} transaksi yang masih butuh tindak lanjut.\n\nAnda mau saya bantu dalami sisi promosi, operasional, atau strategi menaikkan penjualan dulu?`,
  }
}

function createUnknownFlowResult() {
  return {
    mode: 'chat',
    context: conversationModes.chat.context,
    assistantText:
      'Bisa, saya bantu. Supaya arahnya pas, Anda bisa mulai dari salah satu ini: "analisa bisnis saya", "cek stok hari ini", "ringkasan penjualan", atau "jual 2 kopi susu dan 1 latte".\n\nAnda mau mulai dari insight bisnis atau draft transaksi?',
  }
}

export function createChatFlowResult({ userText, attachmentName, pendingDraft }) {
  const intent = detectIntent({ userText, attachmentName, pendingDraft })

  if (intent.type === 'draft_correction') {
    return {
      mode: 'chat',
      ...intent.correctionResult,
    }
  }

  if (intent.type === 'transaction_input') {
    return createTransactionFlowResult(intent.chatDraft)
  }

  if (intent.type === 'attachment_input') {
    return createAttachmentFlowResult(attachmentName)
  }

  if (intent.type === 'greeting') {
    return createGreetingFlowResult()
  }

  if (intent.type === 'business_question') {
    if (intent.topic === 'stock') {
      return createStockFlowResult(userText)
    }

    if (intent.topic === 'sales_summary') {
      return createSalesSummaryFlowResult()
    }

    return createBusinessInsightFlowResult(intent.topic)
  }

  return createUnknownFlowResult()
}

export function getAssistantResponseDelayMs({ userText = '', result }) {
  if (result?.mode === 'scan') {
    return 700
  }

  const wordCount = userText.trim().split(/\s+/).filter(Boolean).length
  const baseDelay = result?.draft ? 900 : 550
  const variableDelay = Math.min(420, wordCount * 55)

  return Math.min(1200, baseDelay + variableDelay)
}

export function createScannerFlowResult(product) {
  const draft = buildDraftFromScanner(product)

  return {
    mode: 'scan',
    context: {
      modeLabel: 'Scan Barcode',
      barcode: product.barcode,
      description: `Produk ${product.name} berhasil ditemukan dari hasil scan. Saya sudah menyiapkan draft transaksi awal untuk Anda review.`,
    },
    draft,
    assistantText: `Barcode ${product.barcode} terbaca untuk ${product.name}. Saya sudah siapkan draft transaksinya di bawah. Silakan cek dulu, lalu lanjutkan jika sudah sesuai.`,
  }
}

