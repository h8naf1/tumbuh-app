import { useEffect, useMemo, useState } from 'react'
import { Bot } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button.jsx'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import DashboardTopbar from '../components/dashboard/DashboardTopbar.jsx'
import { formatRupiah } from '../lib/formatters.js'
import { isLowStockProduct } from '../lib/productHelpers.js'
import ProductFilterBar from '../components/products/ProductFilterBar.jsx'
import ProductStats from '../components/products/ProductStats.jsx'
import ProductTable from '../components/products/ProductTable.jsx'
import AddProductModal from '../components/products/modals/AddProductModal.jsx'
import DeleteProductModal from '../components/products/modals/DeleteProductModal.jsx'
import { cloneProductCatalog, productCategoryOptions } from '../data/productCatalog.js'
import {
  dashboardSidebarItems,
  dashboardUserProfile,
} from '../data/dashboardData.js'

const initialFormState = {
  name: '',
  category: '',
  stock: '',
  price: '',
  description: '',
}

function formatPriceInput(value) {
  return new Intl.NumberFormat('id-ID').format(Number(value))
}

function ProdukPage() {
  const initialProducts = cloneProductCatalog()

  // State utama untuk data produk, filter, modal, selection, dan pagination.
  const [products, setProducts] = useState(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productsPendingDeletion, setProductsPendingDeletion] = useState([])
  const [selectedProductIds, setSelectedProductIds] = useState([])
  const [formData, setFormData] = useState(initialFormState)
  const [selectedImageName, setSelectedImageName] = useState('')
  const [editingProductId, setEditingProductId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Slot layout dashboard.
  const sidebar = (
    <DashboardSidebar
      items={dashboardSidebarItems}
      userProfile={dashboardUserProfile}
    />
  )

  const topbar = <DashboardTopbar title="Daftar Produk" />

  // Data turunan untuk tabel dan kartu statistik.
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
    products.filter((product) => isLowStockProduct(product.stock)).length,
  )
  const categoryCount = Math.max(
    5,
    new Set(products.map((product) => product.category)).size,
  )

  const selectedProducts = useMemo(
    () => products.filter((product) => selectedProductIds.includes(product.id)),
    [products, selectedProductIds],
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

  // Reset pagination saat kategori diganti.
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  // Menjaga halaman aktif tetap valid setelah data berubah.
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  // Bersihkan selection jika ada produk yang sudah tidak tersedia.
  useEffect(() => {
    const existingIds = new Set(products.map((product) => product.id))
    setSelectedProductIds((currentIds) =>
      currentIds.filter((id) => existingIds.has(id)),
    )
  }, [products])

  // Handler modal tambah atau edit produk.
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

  function handleCloseDeleteModal() {
    setProductsPendingDeletion([])
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

  // Handler submit produk baru atau edit produk.
  function handleSubmitProduct(event) {
    event.preventDefault()

    const existingProduct = products.find((product) => product.id === editingProductId)

    const nextProduct = {
      id: editingProductId || `product-${Date.now()}`,
      sku: existingProduct?.sku || `PRD-${Date.now()}`,
      name: formData.name.trim(),
      category: formData.category,
      stock: Number(formData.stock) || 0,
      price: Number(formData.price) || 0,
      image: existingProduct?.image || '',
      description: formData.description.trim(),
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

  // Membuka modal konfirmasi hapus dengan gaya UI aplikasi.
  function handleDeleteProduct(product) {
    setProductsPendingDeletion([product])
  }

  function handleDeleteSelectedProducts() {
    if (!selectedProducts.length) {
      return
    }

    setProductsPendingDeletion(selectedProducts)
  }

  function handleConfirmDeleteProduct(productsToDelete) {
    const idsToDelete = new Set(productsToDelete.map((product) => product.id))

    setProducts((currentProducts) =>
      currentProducts.filter((item) => !idsToDelete.has(item.id)),
    )
    setSelectedProductIds((currentIds) =>
      currentIds.filter((id) => !idsToDelete.has(id)),
    )
    setProductsPendingDeletion([])
  }

  function handleToggleProductSelection(productId) {
    setSelectedProductIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    )
  }

  function handleToggleSelectAll(pageProducts, shouldSelect) {
    const pageIds = pageProducts.map((product) => product.id)

    setSelectedProductIds((currentIds) => {
      if (shouldSelect) {
        return Array.from(new Set([...currentIds, ...pageIds]))
      }

      return currentIds.filter((id) => !pageIds.includes(id))
    })
  }

  function handlePageChange(nextPage) {
    setCurrentPage(nextPage)
  }

  return (
    <>
      <DashboardLayout sidebar={sidebar} topbar={topbar}>
        <div className="app-page-stack">
          {/* Ringkasan statistik produk. */}
          <ProductStats metrics={metrics} />

          {/* Shortcut bantuan kontekstual ke Asisten Chat. */}
          <section className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-4 transition-colors duration-300 sm:p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/12 text-blue-400">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[var(--app-text)]">Butuh bantuan mengelola produk?</h2>
                  <p className="mt-1 text-sm leading-6 text-[var(--app-text-soft)]">
                    Gunakan Asisten Chat untuk menyiapkan draft produk baru, membaca nota, atau bantu cek stok yang perlu diperbarui.
                  </p>
                </div>
              </div>

              <Button
  asChild
  variant="outline"
  size="lg"
  className="h-11 rounded-xl border-[var(--app-border)] bg-[var(--app-surface)] px-4 text-[var(--app-text)] hover:bg-[var(--app-surface-strong)] hover:text-[var(--app-text)]"
>
  <Link to="/asisten-chat">Buka Asisten Chat</Link>
</Button>
            </div>
          </section>

          {/* Toolbar filter, bulk action, dan aksi tambah produk. */}
          <ProductFilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categoryOptions={productCategoryOptions}
            onOpenModal={handleOpenModal}
            selectedCount={selectedProductIds.length}
            onDeleteSelected={handleDeleteSelectedProducts}
          />

          {/* Tabel daftar produk dengan selection. */}
          <ProductTable
            products={paginatedProducts}
            totalProducts={totalProducts}
            formatRupiah={formatRupiah}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            selectedProductIds={selectedProductIds}
            onToggleProductSelection={handleToggleProductSelection}
            onToggleSelectAll={handleToggleSelectAll}
          />
        </div>
      </DashboardLayout>

      {/* Modal tambah dan edit produk. */}
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
        categoryOptions={productCategoryOptions}
        formatPriceInput={formatPriceInput}
      />

      {/* Modal konfirmasi hapus satu atau banyak produk. */}
      <DeleteProductModal
        products={productsPendingDeletion}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteProduct}
      />
    </>
  )
}

export default ProdukPage

