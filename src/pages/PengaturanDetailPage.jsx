import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Bot, Save } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Checkbox from '../components/ui/Checkbox.jsx'
import Input from '../components/ui/Input.jsx'
import DashboardLayout from '../components/dashboard/DashboardLayout.jsx'
import DashboardSidebar from '../components/dashboard/DashboardSidebar.jsx'
import DashboardTopbar from '../components/dashboard/DashboardTopbar.jsx'
import PengaturanSupportCard from '../components/Pengaturan/PengaturanSupportCard.jsx'
import PengaturanSectionData from '../components/Pengaturan/PengaturanSectionData.jsx'
import {
  dashboardSidebarItems,
  dashboardUserProfile,
} from '../data/dashboardData.js'

// Helper untuk membangun nilai awal form dari data konfigurasi.
function buildInitialValues(section) {
  if (!section) {
    return {}
  }

  return section.formSections.reduce((result, sectionItem) => {
    sectionItem.fields.forEach((field) => {
      result[field.id] = field.value
    })

    return result
  }, {})
}

function PengaturanDetailPage() {
  // State utama halaman detail pengaturan.
  const { sectionId } = useParams()
  const section = useMemo(
    () => PengaturanSectionData.find((item) => item.id === sectionId),
    [sectionId],
  )
  const [formValues, setFormValues] = useState(() => buildInitialValues(section))
  const [saveMessage, setSaveMessage] = useState('')

  // Reset form lokal saat submenu yang dibuka berubah.
  useEffect(() => {
    setFormValues(buildInitialValues(section))
    setSaveMessage('')
  }, [section])

  // Slot layout dashboard.
  const sidebar = (
    <DashboardSidebar
      items={dashboardSidebarItems}
      userProfile={dashboardUserProfile}
    />
  )

  const topbar = (
    <DashboardTopbar
      title={section ? section.title : 'Detail Pengaturan'}
      subtitle={section ? section.description : 'Menu pengaturan tidak ditemukan.'}
    />
  )

  // Handler perubahan field form preview.
  const handleFieldChange = (fieldId, nextValue) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldId]: nextValue,
    }))
  }

  // Handler simpan preview perubahan pengaturan.
  const handleSubmit = (event) => {
    event.preventDefault()
    setSaveMessage('Perubahan berhasil disimpan secara lokal untuk preview halaman.')
  }

  // Tampilan fallback jika submenu tidak ditemukan.
  if (!section) {
    return (
      <DashboardLayout sidebar={sidebar} topbar={topbar}>
        <div className="app-page-stack">
          <section className="rounded-[26px] border border-slate-800 bg-slate-900 p-6">
            <h1 className="text-2xl font-semibold text-white">Menu pengaturan tidak ditemukan</h1>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Sub section yang Anda buka belum tersedia atau alamatnya tidak sesuai.
            </p>
            <Link
              to="/pengaturan"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Pengaturan
            </Link>
          </section>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout sidebar={sidebar} topbar={topbar}>
      <div className="app-page-stack">
        {/* Header detail submenu pengaturan. */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link
              to="/pengaturan"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Pengaturan
            </Link>
            <h1 className="mt-4 text-3xl font-bold text-white">{section.detailTitle}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
              {section.detailDescription}
            </p>
          </div>

          <div className={`flex h-14 w-14 items-center justify-center rounded-3xl ${section.accentClassName}`}>
            <section.icon className="h-7 w-7" />
          </div>
        </div>

        {/* Form utama untuk preview isi submenu pengaturan. */}
        <form onSubmit={handleSubmit} className="rounded-[26px] border border-slate-800 bg-slate-900 p-5 sm:p-6">
          <div className="flex flex-col gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Form Pengaturan
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Atur nilai yang ingin Anda gunakan untuk menu {section.title}.
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              Simpan Perubahan
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {section.formSections.map((formSection) => (
              <section key={formSection.id} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4 sm:p-5">
                <h2 className="text-lg font-semibold text-white">{formSection.title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-400">{formSection.description}</p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {formSection.fields.map((field) => {
                    if (field.type === 'textarea') {
                      return (
                        <label key={field.id} className="md:col-span-2">
                          <span className="mb-2 block text-sm font-medium text-slate-200">{field.label}</span>
                          <textarea
                            rows="4"
                            value={formValues[field.id] ?? ''}
                            onChange={(event) => handleFieldChange(field.id, event.target.value)}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15"
                          />
                        </label>
                      )
                    }

                    if (field.type === 'select') {
                      return (
                        <label key={field.id}>
                          <span className="mb-2 block text-sm font-medium text-slate-200">{field.label}</span>
                          <select
                            value={formValues[field.id] ?? ''}
                            onChange={(event) => handleFieldChange(field.id, event.target.value)}
                            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15"
                          >
                            {field.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>
                      )
                    }

                    if (field.type === 'toggle') {
                      return (
                        <label key={field.id} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-4">
                          <Checkbox
                            checked={Boolean(formValues[field.id])}
                            onCheckedChange={(checked) => handleFieldChange(field.id, Boolean(checked))}
                            className="mt-0.5"
                          />
                          <span>
                            <span className="block text-sm font-medium text-slate-100">{field.label}</span>
                            <span className="mt-1 block text-sm text-slate-400">
                              Aktifkan opsi ini agar pengaturan langsung diterapkan pada akun usaha Anda.
                            </span>
                          </span>
                        </label>
                      )
                    }

                    return (
                      <label key={field.id}>
                        <span className="mb-2 block text-sm font-medium text-slate-200">{field.label}</span>
                        <Input
                          type={field.type}
                          value={formValues[field.id] ?? ''}
                          onChange={(event) => handleFieldChange(field.id, event.target.value)}
                        />
                      </label>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          {saveMessage ? (
            <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              {saveMessage}
            </div>
          ) : null}
        </form>

        {/* Shortcut bantuan kontekstual ke Asisten Chat. */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/12 text-blue-400">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">Butuh bantuan memahami menu ini?</h2>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Gunakan Asisten Chat untuk meminta saran atau penjelasan lebih lanjut terkait pengaturan {section.title}.
                </p>
              </div>
            </div>

            <Link
              to="/asisten-chat"
              className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              Tanya lewat Asisten Chat
            </Link>
          </div>
        </section>

        {/* Kartu bantuan tambahan untuk halaman detail pengaturan. */}
        <PengaturanSupportCard />
      </div>
    </DashboardLayout>
  )
}

export default PengaturanDetailPage
