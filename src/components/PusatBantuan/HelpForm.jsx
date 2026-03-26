import { useState } from 'react'
import { ChevronDown, Loader2, Send } from 'lucide-react'
import { helpCategories, initialFormState } from './helpData.js'
import HelpFormSuccess from './HelpFormSuccess.jsx'

const fieldLabelClass = 'mb-2 block text-sm font-medium text-(--app-text)'
const fieldInputBase =
  'w-full rounded-xl border border-(--app-border) bg-(--app-surface-strong) px-4 py-3 text-sm text-(--app-text) placeholder:text-(--app-text-muted) outline-none transition duration-200 focus:border-blue-500/70 focus:bg-(--app-surface) focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] hover:border-blue-500/20'

function HelpForm() {
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validate = () => {
    const next = {}
    if (!form.category) next.category = 'Pilih jenis kendala terlebih dahulu.'
    if (!form.title.trim()) next.title = 'Ringkasan masalah wajib diisi.'
    if (!form.description.trim()) next.description = 'Ceritakan kendala Anda.'
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleReset = () => {
    setForm(initialFormState)
    setErrors({})
    setIsSuccess(false)
  }

  if (isSuccess) {
    return <HelpFormSuccess onReset={handleReset} />
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="help-name" className={fieldLabelClass}>
          Nama Anda
          <span className="ml-1.5 text-xs font-normal text-(--app-text-muted)">(opsional)</span>
        </label>
        <input
          id="help-name"
          type="text"
          value={form.name}
          onChange={handleChange('name')}
          placeholder="Contoh: Budi Santoso"
          maxLength={80}
          className={fieldInputBase}
        />
      </div>

      <div>
        <label htmlFor="help-category" className={fieldLabelClass}>
          Jenis Kendala
          <span className="ml-1 text-rose-500" aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <select
            id="help-category"
            value={form.category}
            onChange={handleChange('category')}
            className={[
              fieldInputBase,
              'cursor-pointer appearance-none pr-10',
              form.category === '' ? 'text-(--app-text-muted)' : 'text-(--app-text)',
              errors.category ? 'border-rose-500/60 focus:border-rose-500/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]' : '',
            ].join(' ')}
            aria-describedby={errors.category ? 'category-error' : undefined}
          >
            <option value="" disabled>Pilih kategori keluhan...</option>
            {helpCategories.map((cat) => (
              <option key={cat} value={cat} className="bg-(--app-surface) text-(--app-text)">
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--app-text-muted)"
            aria-hidden="true"
          />
        </div>
        {errors.category && (
          <p id="category-error" role="alert" className="mt-1.5 text-xs text-rose-500">
            {errors.category}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="help-title" className={fieldLabelClass}>
          Ringkasan Masalah
          <span className="ml-1 text-rose-500" aria-hidden="true">*</span>
        </label>
        <input
          id="help-title"
          type="text"
          value={form.title}
          onChange={handleChange('title')}
          placeholder="Contoh: Transaksi tidak tersimpan"
          maxLength={120}
          className={[
            fieldInputBase,
            errors.title ? 'border-rose-500/60 focus:border-rose-500/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]' : '',
          ].join(' ')}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <p id="title-error" role="alert" className="mt-1.5 text-xs text-rose-500">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="help-description" className={fieldLabelClass}>
          Ceritakan Kendala Anda
          <span className="ml-1 text-rose-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="help-description"
          value={form.description}
          onChange={handleChange('description')}
          placeholder="Jelaskan secara singkat apa yang terjadi agar kami bisa membantu lebih cepat..."
          rows={4}
          maxLength={800}
          className={[
            fieldInputBase,
            'resize-none leading-6',
            errors.description ? 'border-rose-500/60 focus:border-rose-500/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]' : '',
          ].join(' ')}
          aria-describedby={errors.description ? 'desc-error' : undefined}
        />
        <div className="mt-1 flex items-start justify-between gap-2">
          {errors.description ? (
            <p id="desc-error" role="alert" className="text-xs text-rose-500">
              {errors.description}
            </p>
          ) : (
            <span />
          )}
          <span className="shrink-0 text-right text-xs text-(--app-text-muted)">
            {form.description.length}/800
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="help-contact" className={fieldLabelClass}>
          Kontak yang bisa dihubungi
          <span className="ml-1.5 text-xs font-normal text-(--app-text-muted)">(opsional)</span>
        </label>
        <input
          id="help-contact"
          type="text"
          value={form.contact}
          onChange={handleChange('contact')}
          placeholder="Email atau nomor WhatsApp Anda"
          className={fieldInputBase}
        />
        <p className="mt-1.5 text-xs leading-5 text-(--app-text-muted)">
          Isi jika ingin kami menghubungi Anda langsung via pesan atau email.
        </p>
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          id="help-submit-btn"
          className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_-8px_rgba(37,99,235,0.40)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_8px_32px_-8px_rgba(37,99,235,0.55)] disabled:pointer-events-none disabled:opacity-60"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 translate-x-[-120%] skew-x-[-20deg] bg-white/10 transition duration-500 group-hover:translate-x-[120%]"
          />
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Kirim Keluhan
            </>
          )}
        </button>
        <p className="mt-3 text-center text-xs text-(--app-text-muted)">
          Kami menjaga privasi data Anda. Informasi hanya digunakan untuk membantu penyelesaian masalah.
        </p>
      </div>
    </form>
  )
}

export default HelpForm
