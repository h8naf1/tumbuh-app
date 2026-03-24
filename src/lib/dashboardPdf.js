import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { format } from 'date-fns'

// Helper format angka ke Rupiah.
function formatRupiah(value) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`
}

// Helper mengubah teks Rupiah menjadi angka untuk perhitungan.
function parseRupiah(value) {
  const numeric = String(value).replace(/[^\d]/g, '')
  return Number(numeric || 0)
}

// Helper header bersama untuk semua file PDF dashboard.
function addReportHeader(doc, title, subtitle) {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('TUMBUH', 14, 18)

  doc.setFontSize(14)
  doc.text(title, 14, 28)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text(subtitle, 14, 35)
}

// Helper membentuk baris ringkasan untuk tabel PDF.
function buildSummaryRows(summaryCards) {
  return summaryCards.map((card) => [card.title, card.value, card.trend])
}

// Generator PDF laporan penjualan.
export function downloadSalesReportPdf({ summaryCards, transactions, chartData, dateRange }) {
  const doc = new jsPDF()
  const periodText = `${format(dateRange.from, 'dd MMM yyyy')} - ${format(dateRange.to, 'dd MMM yyyy')}`

  addReportHeader(
    doc,
    'Laporan Penjualan',
    `Dicetak pada ${format(new Date(), 'dd MMM yyyy, HH:mm')} | Periode ${periodText}`,
  )

  autoTable(doc, {
    startY: 42,
    head: [['Ringkasan', 'Nilai', 'Perubahan']],
    body: buildSummaryRows(summaryCards),
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 10 },
  })

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Tanggal', 'Indeks Penjualan']],
    body: chartData.map((item) => [item.fullLabel, String(item.amount)]),
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42] },
    styles: { fontSize: 10 },
  })

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [['ID Transaksi', 'Produk', 'Harga', 'Metode', 'Status']],
    body: transactions.map((item) => [
      item.id,
      item.productName,
      item.price,
      item.paymentMethod,
      item.status,
    ]),
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 9 },
  })

  doc.save(`laporan-penjualan-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
}

export function downloadFinanceReportPdf({ summaryCards, transactions, dateRange }) {
  const doc = new jsPDF()
  const periodText = `${format(dateRange.from, 'dd MMM yyyy')} - ${format(dateRange.to, 'dd MMM yyyy')}`
  const totalIncome = transactions.reduce((total, item) => total + parseRupiah(item.price), 0)
  const completedTransactions = transactions.filter((item) => item.status === 'Selesai').length
  const pendingTransactions = transactions.filter((item) => item.status !== 'Selesai').length

  addReportHeader(
    doc,
    'Laporan Keuangan',
    `Dicetak pada ${format(new Date(), 'dd MMM yyyy, HH:mm')} | Periode ${periodText}`,
  )

  autoTable(doc, {
    startY: 42,
    head: [['Keterangan', 'Nilai']],
    body: [
      ['Estimasi pemasukan dari transaksi tercatat', formatRupiah(totalIncome)],
      ['Transaksi selesai', String(completedTransactions)],
      ['Transaksi belum selesai', String(pendingTransactions)],
      ['Periode laporan', periodText],
    ],
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 10 },
  })

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Ringkasan Dashboard', 'Nilai', 'Catatan']],
    body: buildSummaryRows(summaryCards),
    theme: 'grid',
    headStyles: { fillColor: [15, 23, 42] },
    styles: { fontSize: 10 },
  })

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [['ID Transaksi', 'Produk', 'Nominal', 'Metode', 'Status']],
    body: transactions.map((item) => [
      item.id,
      item.productName,
      item.price,
      item.paymentMethod,
      item.status,
    ]),
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 9 },
  })

  doc.save(`laporan-keuangan-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
}
