import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
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

  const passwordInputType = isPasswordVisible ? 'text' : 'password'
  const confirmPasswordInputType = isConfirmPasswordVisible ? 'text' : 'password'
  const passwordToggleLabel = isPasswordVisible
    ? 'Sembunyikan kata sandi'
    : 'Tampilkan kata sandi'
  const confirmPasswordToggleLabel = isConfirmPasswordVisible
    ? 'Sembunyikan konfirmasi kata sandi'
    : 'Tampilkan konfirmasi kata sandi'

  function handlePasswordVisibilityButtonClick() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  function handleConfirmPasswordVisibilityButtonClick() {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
  }

  function handleRegisterFormSubmit(data) {
    clearToast()

    console.log({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      termsAccepted: data.termsAccepted,
    })
  }

  function handleRegisterFormError(formErrors) {
    showFirstFormError(formErrors)
  }

  return (
    <AuthLayout>
      <FormToast message={toastMessage} />
      <div className="mt-4 w-full rounded-[2rem] border border-slate-800 bg-slate-900/88 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:mt-6 sm:p-6 lg:max-w-2xl lg:px-8 lg:py-7">
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

          <Button type="submit" className="w-full py-3.5 text-base" disabled={isSubmitting}>
            Daftar
          </Button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Atau daftar dengan
          </span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

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
