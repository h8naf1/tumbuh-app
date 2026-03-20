import { useState } from 'react'
import {
  AlertTriangle,
  Archive,
  LayoutGrid,
} from 'lucide-react'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import DashboardTopbar from '../components/dashboard/DashboardTopbar.jsx'
import ProductFilterBar from '../components/products/ProductFilterBar.jsx'
import ProductStats from '../components/products/ProductStats.jsx'
import ProductTable from '../components/products/ProductTable.jsx'
import AddProductModal from '../components/products/modals/AddProductModal.jsx'
import {
  dashboardSidebarItems,
  dashboardUserProfile,
} from '../data/dashboardData.js'

const categoryOptions = ['Coffee', 'Pastry', 'Food', 'Drink']

const initialFormState = {
  name: '',
  category: '',
  stock: '',
  price: '',
  description: '',
}

const initialProducts = [
  {
    id: 'product-1',
    name: 'Kopi Susu Gula Aren',
    category: 'Coffee',
    stock: 45,
    price: 18000,
  },
  {
    id: 'product-2',
    name: 'Brownies Cokelat',
    category: 'Pastry',
    stock: 5,
    price: 22000,
  },
  {
    id: 'product-3',
    name: 'Croissant Almond',
    category: 'Pastry',
    stock: 0,
    price: 25000,
  },
  {
    id: 'product-4',
    name: 'Americano Ice',
    category: 'Coffee',
    stock: 32,
    price: 20000,
  },
]

function formatRupiah(amount) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`
}

function formatPriceInput(value) {
  return new Intl.NumberFormat('id-ID').format(Number(value))
}

function ProdukPage() {
  const [products, setProducts] = useState(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState(initialFormState)
  const [selectedImageName, setSelectedImageName] = useState('')

  const sidebar = (
    <DashboardSidebar
      items={dashboardSidebarItems}
      userProfile={dashboardUserProfile}
    />
  )

  const topbar = (
    <DashboardTopbar
      title="Daftar Produk"
      searchPlaceholder="Cari menu..."
      showProfileButton={false}
    />
  )

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory)

  const totalProducts = 124 + products.length - initialProducts.length
  const lowStockCount = Math.max(
    12,
    products.filter((product) => product.stock > 0 && product.stock <= 5).length,
  )
  const categoryCount = Math.max(
    5,
    new Set(products.map((product) => product.category)).size,
  )

  const metrics = [
    {
      id: 'total-products',
      title: 'Total Produk',
      value: totalProducts,
      badge: '+2% bulan ini',
      iconClassName: 'bg-blue-500/10 text-blue-400',
      badgeClassName: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      id: 'low-stock',
      title: 'Stok Menipis',
      value: lowStockCount,
      badge: 'Butuh Perhatian',
      iconClassName: 'bg-amber-500/10 text-amber-400',
      badgeClassName: 'bg-amber-500/10 text-amber-400',
    },
    {
      id: 'categories',
      title: 'Kategori Produk',
      value: categoryCount,
      iconClassName: 'bg-violet-500/10 text-violet-400',
      badgeClassName: '',
    },
  ]

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setFormData(initialFormState)
    setSelectedImageName('')
  }

  function handleFormInputChange(event) {
    const { name, value } = event.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  function handlePriceChange(event) {
    const numericValue = event.target.value.replace(/\D/g, '')

    setFormData((currentFormData) => ({
      ...currentFormData,
      price: numericValue,
    }))
  }

  function handleImageChange(event) {
    setSelectedImageName(event.target.files?.[0]?.name ?? '')
  }

  function handleSubmitProduct(event) {
    event.preventDefault()

    const nextProduct = {
      id: `product-${Date.now()}`,
      name: formData.name.trim(),
      category: formData.category,
      stock: Number(formData.stock) || 0,
      price: Number(formData.price) || 0,
    }

    setProducts((currentProducts) => [nextProduct, ...currentProducts])
    handleCloseModal()
  }

  return (
    <>
      <DashboardLayout sidebar={sidebar} topbar={topbar}>
        <div className="app-page-stack">
          <ProductStats metrics={metrics} />

          <ProductFilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categoryOptions={categoryOptions}
            onOpenModal={handleOpenModal}
          />

          <ProductTable
            products={filteredProducts}
            totalProducts={totalProducts}
            formatRupiah={formatRupiah}
          />
        </div>
      </DashboardLayout>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
        formData={formData}
        onFormInputChange={handleFormInputChange}
        onPriceChange={handlePriceChange}
        onImageChange={handleImageChange}
        selectedImageName={selectedImageName}
        categoryOptions={categoryOptions}
        formatPriceInput={formatPriceInput}
      />
    </>
  )
}

export default ProdukPage
