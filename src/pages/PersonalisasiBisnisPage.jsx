import { useMemo, useState } from 'react'
import { ArrowRight, Store } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout.jsx'
import { Button } from '../components/ui/Button.jsx'
import Input from '../components/ui/Input.jsx'

const businessTypeOptions = [
  'Coffee Shop',
  'Toko Makanan & Minuman',
  'Toko Kelontong',
  'Bakery',
  'Fashion',
  'Jasa',
]

const defaultFormValues = {
  businessName: 'Kopi Nusantara',
  businessType: 'Coffee Shop',
  mainProducts: 'Latte, Cappuccino, Kopi Susu Gula Aren',
}

function PersonalisasiBisnisPage() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(defaultFormValues)
  const [errors, setErrors] = useState({})

  const productPreview = useMemo(
    () =>
      formValues.mainProducts
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 4),
    [formValues.mainProducts],
  )

  function handleFieldChange(event) {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
  }

  function validateForm() {
    const nextErrors = {}

    if (!formValues.businessName.trim()) {
      nextErrors.businessName = 'Nama usaha masih perlu diisi.'
    }

    if (!formValues.businessType.trim()) {
      nextErrors.businessType = 'Pilih jenis usaha terlebih dahulu.'
    }

    if (!formValues.mainProducts.trim()) {
      nextErrors.mainProducts = 'Isi minimal satu produk utama.'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    console.log('Business personalization:', formValues)
    navigate('/dashboard')
  }

  return (
    <AuthLayout>
      <div className="mt-4 w-full rounded-[1.75rem] border border-slate-800 bg-slate-900/88 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:mt-5 sm:p-6 lg:max-w-2xl lg:px-7 lg:py-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/12 text-blue-400">
            <Store className="h-5 w-5" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Onboarding
            </p>
            <h2 className="text-3xl font-black tracking-tight text-white">
              Personalisasi Bisnis Anda
            </h2>
            <p className="text-sm leading-6 text-slate-400 sm:text-base">
              Bantu TUMBUH memahami konteks usaha Anda agar dashboard demo terasa lebih relevan dan realistis.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <p className="text-sm font-semibold text-white">Ringkasan cepat</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            Data ini masih frontend only dan bisa diisi otomatis untuk kebutuhan demo juri. Setelah submit, Anda akan langsung diarahkan ke dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="business-name"
              className="block text-sm font-semibold text-slate-200"
            >
              Nama Toko / Usaha
            </label>
            <Input
              id="business-name"
              name="businessName"
              value={formValues.businessName}
              onChange={handleFieldChange}
              placeholder="Contoh: Kopi Nusantara"
              aria-invalid={errors.businessName ? 'true' : 'false'}
            />
            {errors.businessName ? (
              <p className="text-sm text-red-400">{errors.businessName}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="business-type"
              className="block text-sm font-semibold text-slate-200"
            >
              Jenis Usaha
            </label>
            <select
              id="business-type"
              name="businessType"
              value={formValues.businessType}
              onChange={handleFieldChange}
              className="flex h-12 w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 text-sm text-slate-100 outline-none transition focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
              aria-invalid={errors.businessType ? 'true' : 'false'}
            >
              {businessTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.businessType ? (
              <p className="text-sm text-red-400">{errors.businessType}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="main-products"
              className="block text-sm font-semibold text-slate-200"
            >
              Produk utama yang dijual
            </label>
            <Input
              id="main-products"
              name="mainProducts"
              value={formValues.mainProducts}
              onChange={handleFieldChange}
              placeholder="Pisahkan dengan koma, misalnya Latte, Cappuccino"
              aria-invalid={errors.mainProducts ? 'true' : 'false'}
            />
            <p className="text-sm text-slate-400">
              Gunakan format sederhana agar mudah dipahami user pemula dan cocok untuk demo.
            </p>
            {errors.mainProducts ? (
              <p className="text-sm text-red-400">{errors.mainProducts}</p>
            ) : null}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/55 p-4">
            <p className="text-sm font-semibold text-white">Preview konteks usaha</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Nama Usaha
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {formValues.businessName || 'Belum diisi'}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Jenis Usaha
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  {formValues.businessType || 'Belum dipilih'}
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-slate-800 bg-slate-900/75 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Produk Utama
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {productPreview.length > 0 ? (
                  productPreview.map((product) => (
                    <span
                      key={product}
                      className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {product}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500">Belum ada produk utama.</span>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" className="h-12 w-full text-base font-semibold">
            Lanjut ke Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default PersonalisasiBisnisPage
