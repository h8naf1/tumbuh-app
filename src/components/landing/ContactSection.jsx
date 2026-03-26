import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
    <section id="contact" className="relative short-screen-safe scroll-mt-28 bg-slate-950 px-5 pt-20 pb-20 sm:scroll-mt-32 sm:px-6 sm:pt-24 sm:pb-24 lg:flex lg:min-h-[78svh] lg:items-center lg:pt-24 lg:pb-20 xl:pt-24 xl:pb-24">
      <FormToast message={toastMessage} />

      <div className="mx-auto w-full max-w-[1120px]">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.82fr)] lg:items-start lg:gap-5">
          <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(2,6,23,0.98)_0%,rgba(15,23,42,0.98)_58%,rgba(30,64,175,0.22)_100%)] p-6 shadow-[0_30px_80px_-40px_rgba(2,6,23,0.95)] sm:p-7 lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-200">
              Konsultasi TUMBUH
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-black leading-tight text-white sm:text-[2.7rem] lg:text-[3rem]">
              Konsultasi Gratis untuk usaha anda agar lebih berkembang.
            </h2>

            <div className="mt-6 rounded-[1.5rem] border border-blue-400/20 bg-[linear-gradient(135deg,rgba(30,64,175,0.22)_0%,rgba(14,165,233,0.12)_100%)] p-5 sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200/90">
                Siap Mulai
              </p>
              <h3 className="mt-3 max-w-lg text-xl font-black leading-tight text-white sm:text-[1.75rem]">
                Tinggalkan spreadsheet dan mulai kelola usaha dengan lebih tenang.
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300">
                TUMBUH dirancang untuk UMKM yang ingin bergerak lebih cepat dengan
                data yang lebih rapi, insight yang mudah dipahami, dan proses kerja
                yang tidak terasa rumit.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(37,99,235,0.85)] transition hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Mulai Gratis
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(2,6,23,0.98)_100%)] p-6 shadow-[0_30px_80px_-40px_rgba(2,6,23,1)] sm:p-7 lg:p-8">
            <div className="max-w-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
                Hubungi Kami
              </p>
              <h3 className="mt-2 text-xl font-black text-white sm:text-[1.8rem]">
                Jadwalkan Konsultasi
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Isi detail singkat di bawah ini. Tim kami akan menghubungi Anda
                untuk menjadwalkan konsultasi sesuai kebutuhan bisnis.
              </p>
            </div>

            <form
              noValidate
              onSubmit={handleSubmit(handleContactFormSubmit, handleContactFormError)}
              className="mt-6 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
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
                    className={`py-2.5 ${errors.firstName ? fieldErrorClassName : ''}`.trim()}
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-400">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
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
                    className={`py-2.5 ${errors.lastName ? fieldErrorClassName : ''}`.trim()}
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-400">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
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
                  className={`py-2.5 ${errors.email ? fieldErrorClassName : ''}`.trim()}
                  {...register('email')}
                />
                {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-slate-200"
                >
                  Pesan
                </label>
                <textarea
                  id="contact-message"
                  rows="4"
                  placeholder="Ceritakan tantangan usaha atau tujuan konsultasi Anda."
                  aria-invalid={errors.message ? 'true' : 'false'}
                  className={`w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 ${
                    errors.message ? fieldErrorClassName : ''
                  }`.trim()}
                  {...register('message')}
                />
                {errors.message ? (
                  <p className="text-sm text-red-400">{errors.message.message}</p>
                ) : (
                  <p className="text-[13px] text-slate-400">
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
                className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_-20px_rgba(37,99,235,0.8)] transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_24px_50px_-24px_rgba(59,130,246,0.95)] disabled:cursor-not-allowed disabled:opacity-70"
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
