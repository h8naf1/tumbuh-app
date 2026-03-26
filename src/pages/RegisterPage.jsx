import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import AuthLayout from '../layout/AuthLayout.jsx'
import { Button } from '../components/ui/Button.jsx'
import Checkbox from '../components/ui/Checkbox.jsx'
import Input from '../components/ui/Input.jsx'
import FormToast from '../components/ui/FormToast.jsx'
import useFormToast from '../hooks/useFormToast.js'
import registerSchema from '../lib/validation/registerSchema.js'

function RegisterPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const { toastMessage, clearToast, showFirstFormError } = useFormToast()
  const navigate = useNavigate()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  })

  // Variabel bantu untuk input password.
  const passwordInputType = isPasswordVisible ? 'text' : 'password'
  const confirmPasswordInputType = isConfirmPasswordVisible ? 'text' : 'password'
  const passwordToggleLabel = isPasswordVisible
    ? 'Sembunyikan kata sandi'
    : 'Tampilkan kata sandi'
  const confirmPasswordToggleLabel = isConfirmPasswordVisible
    ? 'Sembunyikan konfirmasi kata sandi'
    : 'Tampilkan konfirmasi kata sandi'

  // Function untuk show/hide password utama.
  function handlePasswordVisibilityButtonClick() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  // Function untuk show/hide konfirmasi password.
  function handleConfirmPasswordVisibilityButtonClick() {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
  }

  // Alur demo untuk simulasi tanpa isi data.
  function handleDemoAccess() {
    navigate('/personalisasi-bisnis')
  }

  // Function untuk submit form register.
  function handleRegisterFormSubmit(data) {
    clearToast()

    console.log({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      termsAccepted: data.termsAccepted,
    })

    navigate('/personalisasi-bisnis')
  }

  // Function untuk menampilkan error form.
  function handleRegisterFormError(formErrors) {
    showFirstFormError(formErrors)
  }

  return (
    <AuthLayout>
      <FormToast message={toastMessage} />
      <div className="mt-4 w-full rounded-[1.75rem] border border-slate-800 bg-slate-900/88 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:mt-5 sm:p-6 lg:max-w-2xl lg:px-7 lg:py-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Daftar
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white">
            Buat Akun TUMBUH
          </h2>
          <p className="text-sm leading-6 text-slate-400 sm:text-base">
            Mulai kelola penjualan, analitik bisnis, dan insight AI untuk UMKM Anda
            dalam satu dashboard.
          </p>
        </div>

        {/* Shortcut demo agar flow hero -> register -> dashboard tetap terasa natural. */}
        <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Ingin langsung mencoba?</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                Untuk demo, Anda bisa langsung masuk ke dashboard tanpa mengisi formulir terlebih dahulu.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDemoAccess}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-blue-100 transition hover:bg-slate-800"
            >
              Coba Demo
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Form register utama. */}
        <form
          noValidate
          onSubmit={handleSubmit(handleRegisterFormSubmit, handleRegisterFormError)}
          className="mt-6 space-y-5"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="register-full-name"
                className="block text-sm font-semibold text-slate-200"
              >
                Nama lengkap
              </label>
              <Input
                id="register-full-name"
                placeholder="Masukkan nama lengkap"
                autoComplete="name"
                aria-invalid={errors.fullName ? 'true' : 'false'}
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className="text-sm text-red-400">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="register-email"
                className="block text-sm font-semibold text-slate-200"
              >
                Email
              </label>
              <Input
                id="register-email"
                type="email"
                placeholder="nama@email.com"
                autoComplete="email"
                aria-invalid={errors.email ? 'true' : 'false'}
                {...register('email')}
              />
              {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="register-password"
                className="block text-sm font-semibold text-slate-200"
              >
                Kata sandi
              </label>
              <div className="relative">
                <Input
                  id="register-password"
                  type={passwordInputType}
                  placeholder="Buat kata sandi"
                  autoComplete="new-password"
                  className="pr-12"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={handlePasswordVisibilityButtonClick}
                  className="absolute inset-y-0 right-3 inline-flex h-full items-center justify-center text-slate-500 transition hover:text-slate-200"
                  aria-label={passwordToggleLabel}
                >
                  {isPasswordVisible ? (
                    <FiEye className="text-base" />
                  ) : (
                    <FiEyeOff className="text-base" />
                  )}
                </button>
              </div>
              <p className="text-sm text-slate-400">
                Gunakan kombinasi huruf dan angka agar akun lebih aman.
              </p>
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="register-confirm-password"
                className="block text-sm font-semibold text-slate-200"
              >
                Konfirmasi kata sandi
              </label>
              <div className="relative">
                <Input
                  id="register-confirm-password"
                  type={confirmPasswordInputType}
                  placeholder="Ulangi kata sandi"
                  autoComplete="new-password"
                  className="pr-12"
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={handleConfirmPasswordVisibilityButtonClick}
                  className="absolute inset-y-0 right-3 inline-flex h-full items-center justify-center text-slate-500 transition hover:text-slate-200"
                  aria-label={confirmPasswordToggleLabel}
                >
                  {isConfirmPasswordVisible ? (
                    <FiEye className="text-base" />
                  ) : (
                    <FiEyeOff className="text-base" />
                  )}
                </button>
              </div>
              <p className="text-sm text-slate-400">
                Pastikan konfirmasi kata sandi sama dengan kata sandi di atas.
              </p>
              {errors.confirmPassword && (
                <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-start gap-3 text-sm leading-6 text-slate-300">
              <Controller
                name="termsAccepted"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                    className="mt-1"
                  />
                )}
              />
              <span>
                Saya menyetujui syarat dan ketentuan serta kebijakan privasi untuk
                menggunakan TUMBUH.
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="text-sm text-red-400">{errors.termsAccepted.message}</p>
            )}
          </div>

          <Button type="submit" className="h-12 w-full text-base font-semibold" disabled={isSubmitting}>
            Daftar
          </Button>
        </form>

        {/* Pemisah section alternatif login. */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Atau daftar dengan
          </span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        {/* Section daftar dengan akun pihak ketiga. */}
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-700 hover:bg-slate-800/80"
          >
            <FcGoogle className="text-lg" />
            Google
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-700 hover:bg-slate-800/80"
          >
            <FaFacebookF className="text-base text-blue-600" />
            Facebook
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400 sm:hidden">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-300">
            Masuk
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default RegisterPage


