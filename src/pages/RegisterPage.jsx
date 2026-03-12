import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { FiAlertCircle } from 'react-icons/fi'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import AuthLayout from '../layout/AuthLayout.jsx'
import InputField from '../components/ui/InputField.jsx'
import PrimaryButton from '../components/ui/PrimaryButton.jsx'

function RegisterPage() {
  const [fullNameValue, setFullNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  const passwordInputType = isPasswordVisible ? 'text' : 'password'
  const confirmPasswordInputType = isConfirmPasswordVisible ? 'text' : 'password'
  const passwordToggleLabel = isPasswordVisible ? 'Sembunyikan password' : 'Tampilkan password'
  const confirmPasswordToggleLabel = isConfirmPasswordVisible
    ? 'Sembunyikan konfirmasi password'
    : 'Tampilkan konfirmasi password'

  function showToast(message) {
    setToastMessage(message)
  }

  useEffect(() => {
    if (!toastMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage('')
    }, 3500)

    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  function handleFullNameInputChange(event) {
    setFullNameValue(event.target.value)
    setErrorMessage('')
  }

  function handleEmailInputChange(event) {
    setEmailValue(event.target.value)
    setErrorMessage('')
  }

  function handlePasswordInputChange(event) {
    setPasswordValue(event.target.value)
    setErrorMessage('')
  }

  function handleConfirmPasswordInputChange(event) {
    setConfirmPasswordValue(event.target.value)
    setErrorMessage('')
  }

  function handleTermsCheckboxChange(event) {
    setIsTermsAccepted(event.target.checked)
    setErrorMessage('')
  }

  function handlePasswordVisibilityButtonClick() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  function handleConfirmPasswordVisibilityButtonClick() {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
  }

  function handleRegisterFormSubmit(event) {
    event.preventDefault()

    if (
      !fullNameValue.trim() ||
      !emailValue.trim() ||
      !passwordValue.trim() ||
      !confirmPasswordValue.trim()
    ) {
      const validationMessage = 'Semua field wajib diisi sebelum membuat akun.'
      setErrorMessage(validationMessage)
      showToast(validationMessage)
      return
    }

    if (!emailValue.includes('@')) {
      const validationMessage = 'Email harus menggunakan format yang benar, misalnya nama@email.com.'
      setErrorMessage(validationMessage)
      showToast(validationMessage)
      return
    }

    if (passwordValue !== confirmPasswordValue) {
      const validationMessage = 'Password dan konfirmasi password harus sama.'
      setErrorMessage(validationMessage)
      showToast(validationMessage)
      return
    }

    if (!isTermsAccepted) {
      const validationMessage = 'Anda perlu menyetujui syarat dan ketentuan terlebih dahulu.'
      setErrorMessage(validationMessage)
      showToast(validationMessage)
      return
    }

    setErrorMessage('')
    setToastMessage('')

    console.log({
      fullName: fullNameValue,
      email: emailValue,
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
      termsAccepted: isTermsAccepted,
    })
  }

  return (
    <AuthLayout>
      <div
        className={`pointer-events-none fixed right-4 top-20 z-50 w-[calc(100%-2rem)] max-w-sm transition-all duration-300 sm:right-6 ${
          toastMessage
            ? 'translate-y-0 opacity-100'
            : '-translate-y-3 opacity-0'
        }`}
      >
        <div className="rounded-2xl border border-red-200 bg-white/95 p-4 shadow-2xl shadow-red-100/60 backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <FiAlertCircle className="text-lg" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900">Periksa form Anda</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{toastMessage}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 w-full rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:mt-6 sm:p-6 lg:max-w-2xl lg:px-8 lg:py-7">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Daftar
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">
            Buat Akun SaleAI
          </h2>
          <p className="text-sm leading-6 text-slate-500 sm:text-base">
            Mulai kelola penjualan, analitik bisnis, dan insight AI untuk UMKM Anda
            dalam satu dashboard.
          </p>
        </div>

        <form noValidate onSubmit={handleRegisterFormSubmit} className="mt-6 space-y-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <InputField
              id="register-full-name"
              labelText="Nama lengkap"
              placeholderText="Masukkan nama lengkap"
              inputValue={fullNameValue}
              onInputChange={handleFullNameInputChange}
              autoCompleteValue="name"
            />

            <InputField
              id="register-email"
              labelText="Email"
              inputType="email"
              placeholderText="nama@email.com"
              inputValue={emailValue}
              onInputChange={handleEmailInputChange}
              autoCompleteValue="email"
            />

            <InputField
              id="register-password"
              labelText="Password"
              inputType={passwordInputType}
              placeholderText="Buat password"
              inputValue={passwordValue}
              onInputChange={handlePasswordInputChange}
              autoCompleteValue="new-password"
              helperText="Gunakan kombinasi huruf dan angka agar akun lebih aman."
              rightSection={
                <button
                  type="button"
                  onClick={handlePasswordVisibilityButtonClick}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label={passwordToggleLabel}
                >
                  {isPasswordVisible ? (
                    <FiEye className="text-base" />
                  ) : (
                    <FiEyeOff className="text-base" />
                  )}
                </button>
              }
            />

            <InputField
              id="register-confirm-password"
              labelText="Konfirmasi password"
              inputType={confirmPasswordInputType}
              placeholderText="Ulangi password"
              inputValue={confirmPasswordValue}
              onInputChange={handleConfirmPasswordInputChange}
              autoCompleteValue="new-password"
              helperText="Pastikan konfirmasi password sama dengan password di atas."
              rightSection={
                <button
                  type="button"
                  onClick={handleConfirmPasswordVisibilityButtonClick}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label={confirmPasswordToggleLabel}
                >
                  {isConfirmPasswordVisible ? (
                    <FiEye className="text-base" />
                  ) : (
                    <FiEyeOff className="text-base" />
                  )}
                </button>
              }
            />
          </div>

          <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
            <input
              type="checkbox"
              checked={isTermsAccepted}
              onChange={handleTermsCheckboxChange}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>
              Saya menyetujui syarat dan ketentuan serta kebijakan privasi untuk
              menggunakan SaleAI.
            </span>
          </label>

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          <PrimaryButton buttonType="submit" extraClassName="w-full py-3.5 text-base">
            Daftar
          </PrimaryButton>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Atau daftar dengan
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

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

        <p className="mt-6 text-center text-sm text-slate-500 sm:hidden">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Masuk
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default RegisterPage
