import { useEffect, useState } from 'react'
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
  const [editingProductId, setEditingProductId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

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
  const itemsPerPage = 4
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage))
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

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

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  function handleOpenModal() {
    setEditingProductId(null)
    setFormData(initialFormState)
    setSelectedImageName('')
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setEditingProductId(null)
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
      id: editingProductId || `product-${Date.now()}`,
      name: formData.name.trim(),
      category: formData.category,
      stock: Number(formData.stock) || 0,
      price: Number(formData.price) || 0,
    }

    setProducts((currentProducts) => {
      if (editingProductId) {
        return currentProducts.map((product) =>
          product.id === editingProductId ? nextProduct : product,
        )
      }

      return [nextProduct, ...currentProducts]
    })
    handleCloseModal()
  }

  function handleEditProduct(product) {
    setEditingProductId(product.id)
    setFormData({
      name: product.name,
      category: product.category,
      stock: String(product.stock),
      price: String(product.price),
      description: product.description || '',
    })
    setSelectedImageName('')
    setIsModalOpen(true)
  }

  function handleDeleteProduct(product) {
    const shouldDelete = window.confirm(
      `Hapus produk "${product.name}" dari daftar produk?`,
    )

    if (!shouldDelete) {
      return
    }

    setProducts((currentProducts) =>
      currentProducts.filter((item) => item.id !== product.id),
    )
  }

  function handlePageChange(nextPage) {
    setCurrentPage(nextPage)
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
            products={paginatedProducts}
            totalProducts={totalProducts}
            formatRupiah={formatRupiah}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </div>
      </DashboardLayout>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProduct}
        title={editingProductId ? 'Edit Produk' : 'Tambah Produk Baru'}
        submitLabel={editingProductId ? 'Simpan Perubahan' : 'Simpan Produk'}
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
