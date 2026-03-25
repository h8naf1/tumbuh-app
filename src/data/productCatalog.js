import kopiButterscotchImage from '../assets/products/kopi butterscotch.jfif'
import kopiSusuGulaArenImage from '../assets/products/kopi susu gula aren.jfif'
import kopiSusuImage from '../assets/products/kopi susu.jpg'
import rotiCroissantImage from '../assets/products/roti croissant.jfif'

// Sumber utama katalog produk yang dipakai lintas halaman.
export const productCatalog = [
  {
    id: 'product-1',
    sku: 'PRD-001',
    name: 'Kopi Susu Gula Aren',
    category: 'Coffee',
    stock: 45,
    price: 24000,
    image: kopiSusuGulaArenImage,
    description:
      'Kopi susu gula aren dengan rasa manis seimbang dan aroma espresso yang kuat.',
  },
  {
    id: 'product-2',
    sku: 'PRD-002',
    name: 'Kopi Butterscotch',
    category: 'Coffee',
    stock: 28,
    price: 26000,
    image: kopiButterscotchImage,
    description:
      'Es kopi creamy dengan sentuhan karamel butterscotch yang lembut.',
  },
  {
    id: 'product-3',
    sku: 'PRD-003',
    name: 'Kopi Susu Signature',
    category: 'Drink',
    stock: 18,
    price: 22000,
    image: kopiSusuImage,
    description:
      'Signature coffee latte dingin dengan foam ringan dan rasa creamy.',
  },
  {
    id: 'product-4',
    sku: 'PRD-004',
    name: 'Roti Croissant Butter',
    category: 'Pastry',
    stock: 9,
    price: 18000,
    image: rotiCroissantImage,
    description:
      'Croissant butter berlapis dengan tekstur renyah di luar dan lembut di dalam.',
  },
]

// Opsi kategori yang dipakai ulang di halaman produk dan form.
export const productCategoryOptions = ['Coffee', 'Pastry', 'Drink']

// Lookup cepat agar data transaksi dan dashboard bisa mengambil detail produk yang sama.
export const productCatalogMap = Object.fromEntries(
  productCatalog.map((product) => [product.id, product]),
)

export function cloneProductCatalog() {
  return productCatalog.map((product) => ({ ...product }))
}

export function findProductById(productId) {
  return productCatalogMap[productId] ?? null
}
