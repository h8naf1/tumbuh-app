import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi'
import AuthLayout from '../layout/AuthLayout.jsx'
import InputField from '../components/ui/InputField.jsx'
import PrimaryButton from '../components/ui/PrimaryButton.jsx'

function LoginPage() {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  const passwordInputType = isPasswordVisible ? 'text' : 'password'
  const passwordToggleLabel = isPasswordVisible ? 'Sembunyikan password' : 'Tampilkan password'

  useEffect(() => {
    if (!toastMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage('')
    }, 3500)

    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  function showToast(message) {
    setToastMessage(message)
  }

  function handleEmailInputChange(event) {
    setEmailValue(event.target.value)
    setErrorMessage('')
  }

  function handlePasswordInputChange(event) {
    setPasswordValue(event.target.value)
    setErrorMessage('')
  }

  function handleRememberMeCheckboxChange(event) {
    setIsRememberMeChecked(event.target.checked)
  }

  function handlePasswordVisibilityButtonClick() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  function handleLoginFormSubmit(event) {
    event.preventDefault()

    if (!emailValue.trim() || !passwordValue.trim()) {
      const validationMessage = 'Email dan password wajib diisi sebelum masuk.'
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

    setErrorMessage('')
    setToastMessage('')

    console.log({
      email: emailValue,
      password: passwordValue,
      rememberMe: isRememberMeChecked,
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

      <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
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

        <form noValidate onSubmit={handleLoginFormSubmit} className="mt-8 space-y-5">
          <InputField
            id="login-email"
            labelText="Email"
            inputType="email"
            placeholderText="nama@email.com"
            inputValue={emailValue}
            onInputChange={handleEmailInputChange}
            autoCompleteValue="email"
          />

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

            <InputField
              id="login-password"
              inputType={passwordInputType}
              placeholderText="Masukkan password"
              inputValue={passwordValue}
              onInputChange={handlePasswordInputChange}
              autoCompleteValue="current-password"
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
          </div>

          <label className="flex items-center gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={isRememberMeChecked}
              onChange={handleRememberMeCheckboxChange}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Ingat saya
          </label>

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          <PrimaryButton buttonType="submit" extraClassName="w-full py-3.5 text-base">
            Masuk
          </PrimaryButton>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Atau masuk dengan
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
