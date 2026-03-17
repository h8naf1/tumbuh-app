import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import FormToast from '../ui/FormToast.jsx'
import Input from '../ui/Input.jsx'
import useFormToast from '../../hooks/useFormToast.js'
import contactConsultationSchema from '../../lib/validation/contactConsultationSchema.js'

function ContactSection() {
  const [successMessage, setSuccessMessage] = useState('')
  const { toastMessage, clearToast, showFirstFormError } = useFormToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactConsultationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      preferredDate: '',
      message: '',
    },
  })

  function handleContactFormSubmit(data) {
    clearToast()
    setSuccessMessage('')

    const consultationRequest = {
      ...data,
      submittedAt: new Date().toISOString(),
    }

    try {
      const existingRequests = JSON.parse(
        window.localStorage.getItem('tumbuhConsultationRequests') ?? '[]',
      )

      window.localStorage.setItem(
        'tumbuhConsultationRequests',
        JSON.stringify([consultationRequest, ...existingRequests]),
      )
    } catch {
      console.warn('Gagal menyimpan data konsultasi ke localStorage.')
    }

    reset()
    setSuccessMessage(
      'Permintaan konsultasi Anda sudah tersimpan. Tim TUMBUH akan segera menghubungi Anda.',
    )
  }

  function handleContactFormError(formErrors) {
    setSuccessMessage('')
    showFirstFormError(formErrors)
  }

  const fieldErrorClassName = 'border-red-500/60 focus:border-red-400 focus:ring-red-500/10'

  return (
    <section id="contact" className="bg-slate-950 px-6 py-24 sm:py-28">
      <FormToast message={toastMessage} />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.88fr)] lg:items-stretch lg:gap-10">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(2,6,23,0.98)_0%,rgba(15,23,42,0.98)_58%,rgba(30,64,175,0.22)_100%)] p-8 shadow-[0_30px_80px_-40px_rgba(2,6,23,0.95)] sm:p-10 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-200">
              Konsultasi TUMBUH
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              Konsultasi yang hangat untuk membantu usaha Anda tumbuh lebih terarah.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Kami membantu Anda melihat peluang perbaikan, merapikan proses
              penjualan, dan menentukan langkah berikutnya dengan penjelasan yang
              sederhana dan mudah dipraktikkan.
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-blue-400/20 bg-[linear-gradient(135deg,rgba(30,64,175,0.22)_0%,rgba(14,165,233,0.12)_100%)] p-6 sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200/90">
                Siap Mulai
              </p>
              <h3 className="mt-3 max-w-xl text-2xl font-black leading-tight text-white sm:text-3xl">
                Tinggalkan spreadsheet dan mulai kelola usaha dengan lebih tenang.
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                TUMBUH dirancang untuk UMKM yang ingin bergerak lebih cepat dengan
                data yang lebih rapi, insight yang mudah dipahami, dan proses kerja
                yang tidak terasa rumit.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(37,99,235,0.85)] transition hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Mulai Gratis
                </Link>
                <a
                  href="#dashboard"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-blue-300/40 hover:bg-white/10"
                >
                  Lihat Dashboard
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(2,6,23,0.98)_100%)] p-8 shadow-[0_30px_80px_-40px_rgba(2,6,23,1)] sm:p-10">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
                Hubungi Kami
              </p>
              <h3 className="mt-3 text-2xl font-black text-white sm:text-[2rem]">
                Book a Consultation
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                Isi detail singkat di bawah ini. Tim kami akan menghubungi Anda
                untuk menjadwalkan konsultasi sesuai kebutuhan bisnis.
              </p>
            </div>

            <form
              noValidate
              onSubmit={handleSubmit(handleContactFormSubmit, handleContactFormError)}
              className="mt-8 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-first-name"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Nama depan
                  </label>
                  <Input
                    id="contact-first-name"
                    placeholder="Nama depan"
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                    className={errors.firstName ? fieldErrorClassName : ''}
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-400">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-last-name"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Nama belakang
                  </label>
                  <Input
                    id="contact-last-name"
                    placeholder="Nama belakang"
                    aria-invalid={errors.lastName ? 'true' : 'false'}
                    className={errors.lastName ? fieldErrorClassName : ''}
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-400">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-slate-200"
                >
                  Email Anda
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="nama@bisnisanda.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  className={errors.email ? fieldErrorClassName : ''}
                  {...register('email')}
                />
                {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-preferred-date"
                  className="block text-sm font-medium text-slate-200"
                >
                  Tanggal yang diinginkan
                </label>
                <Input
                  id="contact-preferred-date"
                  placeholder="dd/mm/yyyy"
                  aria-invalid={errors.preferredDate ? 'true' : 'false'}
                  className={errors.preferredDate ? fieldErrorClassName : ''}
                  {...register('preferredDate')}
                />
                {errors.preferredDate ? (
                  <p className="text-sm text-red-400">{errors.preferredDate.message}</p>
                ) : (
                  <p className="text-sm text-slate-400">
                    Gunakan format tanggal `dd/mm/yyyy`, misalnya `25/03/2026`.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-slate-200"
                >
                  Pesan
                </label>
                <textarea
                  id="contact-message"
                  rows="5"
                  placeholder="Ceritakan tantangan usaha atau tujuan konsultasi Anda."
                  aria-invalid={errors.message ? 'true' : 'false'}
                  className={`w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 ${
                    errors.message ? fieldErrorClassName : ''
                  }`.trim()}
                  {...register('message')}
                />
                {errors.message ? (
                  <p className="text-sm text-red-400">{errors.message.message}</p>
                ) : (
                  <p className="text-sm text-slate-400">
                    Jelaskan kebutuhan Anda minimal dalam 10 karakter.
                  </p>
                )}
              </div>

              {successMessage && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm leading-6 text-emerald-200">
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-4 text-base font-semibold text-white shadow-[0_18px_40px_-20px_rgba(37,99,235,0.8)] transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_24px_50px_-24px_rgba(59,130,246,0.95)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Mengirim...' : 'Jadwalkan Konsultasi'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
