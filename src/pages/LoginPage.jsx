// Import library dan komponen
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import AuthLayout from '../layout/AuthLayout.jsx'
import Button from '../components/ui/Button.jsx'
import Checkbox from '../components/ui/Checkbox.jsx'
import Input from '../components/ui/Input.jsx'
import FormToast from '../components/ui/FormToast.jsx'
import useFormToast from '../hooks/useFormToast.js'
import loginSchema from '../lib/validation/loginSchema.js'

// Komponen utama halaman login
function LoginPage() {
  // State untuk mengatur UI
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { toastMessage, clearToast, showFirstFormError } = useFormToast()

  // State form dari React Hook Form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  // Variabel bantu untuk input password
  const passwordInputType = isPasswordVisible ? 'text' : 'password'
  const passwordToggleLabel = isPasswordVisible ? 'Sembunyikan password' : 'Tampilkan password'

  // Function untuk show/hide password
  function handlePasswordVisibilityButtonClick() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  // Function untuk submit form login
  function handleLoginFormSubmit(data) {
    clearToast()

    console.log({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    })
  }

  // Function untuk menampilkan error form
  function handleLoginFormError(formErrors) {
    showFirstFormError(formErrors)
  }

  return (
    <AuthLayout>
      {/* Toast pesan error */}
      <FormToast message={toastMessage} />

      {/* Card utama halaman login */}
      <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
        {/* Tampilan header halaman login */}
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Masuk
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Masuk ke Akun Anda
          </h2>
          <p className="text-sm leading-6 text-slate-500 sm:text-base">
            Kelola bisnis UMKM Anda dengan lebih cerdas menggunakan AI.
          </p>
        </div>

        {/* Form login utama */}
        <form
          noValidate
          onSubmit={handleSubmit(handleLoginFormSubmit, handleLoginFormError)}
          className="mt-8 space-y-5"
        >
          <div className="space-y-2">
            <label htmlFor="login-email" className="block text-sm font-semibold text-slate-700">
              Email
            </label>
            <Input
              id="login-email"
              type="email"
              placeholder="nama@email.com"
              autoComplete="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              {...register('email')}
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* Bagian input password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <label
                htmlFor="login-password"
                className="block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Lupa password?
              </Link>
            </div>

            <div className="relative">
              <Input
                id="login-password"
                type={passwordInputType}
                placeholder="Masukkan password"
                autoComplete="current-password"
                className="pr-12"
                aria-invalid={errors.password ? 'true' : 'false'}
                {...register('password')}
              />
              <button
                type="button"
                onClick={handlePasswordVisibilityButtonClick}
                className="absolute inset-y-0 right-3 inline-flex h-full items-center justify-center text-slate-500 transition hover:text-slate-700"
                aria-label={passwordToggleLabel}
              >
                {isPasswordVisible ? (
                  <FiEye className="text-base" />
                ) : (
                  <FiEyeOff className="text-base" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Opsi ingat saya */}
          <div className="space-y-2">
            <label className="flex items-center gap-3 text-sm text-slate-600">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                  />
                )}
              />
              Ingat saya
            </label>
          </div>

          {/* Tombol submit */}
          <Button type="submit" className="w-full py-3.5 text-base" disabled={isSubmitting}>
            Masuk
          </Button>
        </form>

        {/* Pemisah section */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Atau masuk dengan
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Section login dengan Google dan Facebook */}
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <FcGoogle className="text-lg" />
            Google
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <FaFacebookF className="text-base text-blue-600" />
            Facebook
          </button>
        </div>

        {/* Link navigasi ke halaman register */}
        <p className="mt-6 text-center text-sm text-slate-500 sm:hidden">
          Belum punya akun?{' '}
          <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
            Daftar
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default LoginPage
