import kopiButterscotchImage from '../assets/products/kopi butterscotch.jfif'
import kopiSusuGulaArenImage from '../assets/products/kopi susu gula aren.jfif'
import kopiSusuImage from '../assets/products/kopi susu.jpg'

// Sumber utama katalog produk yang dipakai lintas halaman.
export const productCatalog = [
  {
    id: 'product-1',
    sku: 'PRD-001',
    name: 'Latte',
    category: 'Coffee',
    stock: 32,
    price: 22000,
    image: kopiSusuImage,
    description:
      'Latte dingin dengan perpaduan espresso dan susu yang lembut untuk menu harian cafe.',
  },
  {
    id: 'product-2',
    sku: 'PRD-002',
    name: 'Cappuccino',
    category: 'Coffee',
    stock: 24,
    price: 23000,
    image: kopiButterscotchImage,
    description:
      'Cappuccino creamy dengan karakter kopi yang tetap terasa dan tekstur foam yang ringan.',
  },
  {
    id: 'product-3',
    sku: 'PRD-003',
    name: 'Kopi Susu Gula Aren',
    category: 'Coffee',
    stock: 45,
    price: 24000,
    image: kopiSusuGulaArenImage,
    description:
      'Menu andalan Kopi Nusantara dengan gula aren yang seimbang dan aroma espresso yang kuat.',
  },
]

// Opsi kategori yang dipakai ulang di halaman produk dan form.
export const productCategoryOptions = ['Coffee']

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
