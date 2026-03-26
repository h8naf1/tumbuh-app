import { findProductById } from './productCatalog.js'
import { formatRupiah } from '../lib/formatters.js'

const transactionSeeds = [
  {
    id: 'TRX-9101',
    productId: 'product-3',
    customerName: 'Dina',
    date: '23 Mar 2026, 09:15',
    paymentMethod: 'QRIS',
    quantity: 2,
    status: 'Selesai',
  },
  {
    id: 'TRX-9102',
    productId: 'product-1',
    customerName: 'Raka',
    date: '23 Mar 2026, 10:02',
    paymentMethod: 'Tunai',
    quantity: 1,
    status: 'Selesai',
  },
  {
    id: 'TRX-9103',
    productId: 'product-2',
    customerName: 'Nadia',
    date: '23 Mar 2026, 11:20',
    paymentMethod: 'QRIS',
    quantity: 2,
    status: 'Selesai',
  },
  {
    id: 'TRX-9104',
    productId: 'product-1',
    customerName: 'Bayu',
    date: '23 Mar 2026, 12:10',
    paymentMethod: 'Transfer',
    quantity: 2,
    status: 'Selesai',
  },
  {
    id: 'TRX-9105',
    productId: 'product-3',
    customerName: 'Salsa',
    date: '23 Mar 2026, 13:45',
    paymentMethod: 'QRIS',
    quantity: 1,
    status: 'Selesai',
  },
  {
    id: 'TRX-9106',
    productId: 'product-2',
    customerName: 'Yoga',
    date: '23 Mar 2026, 15:05',
    paymentMethod: 'Tunai',
    quantity: 1,
    status: 'Dibatalkan',
  },
]

// Sumber utama transaksi yang dipakai halaman transaksi dan dashboard.
export const transactionRecords = transactionSeeds.map((seed) => {
  const product = findProductById(seed.productId)
  const unitPrice = product?.price ?? 0
  const total = unitPrice * seed.quantity

  return {
    ...seed,
    productName: product?.name ?? 'Produk Tidak Ditemukan',
    category: product?.category ?? 'Uncategorized',
    image: product?.image ?? '',
    unitPrice,
    total,
  }
})

// Versi ringkas transaksi untuk kartu dashboard dan laporan.
export const latestTransactionRecords = transactionRecords.slice(0, 4).map((transaction) => ({
  id: transaction.id.replace('TRX-', ''),
  productId: transaction.productId,
  productName: transaction.productName,
  price: formatRupiah(transaction.unitPrice),
  paymentMethod: transaction.paymentMethod,
  status: transaction.status,
  image: transaction.image,
}))
