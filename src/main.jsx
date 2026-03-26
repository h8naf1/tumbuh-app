import { Component, StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppErrorState from './components/AppErrorState.jsx'
import { ThemeProvider } from './components/theme/ThemeProvider.jsx'
import './index.css'

class RootErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Root render error:', error, errorInfo)
  }

  render() {
    if (this.state.error) {
      return (
        <BrowserRouter>
          <AppErrorState
            label="Error 500"
            title="Aplikasi mengalami kesalahan"
            description="Terjadi kendala saat merender halaman. Anda bisa memuat ulang aplikasi atau kembali ke landing page."
            details={String(this.state.error?.message ?? this.state.error)}
            onRetry={() => window.location.reload()}
          />
        </BrowserRouter>
      )
    }

    return this.props.children
  }
}

function AppLoader() {
  const [AppComponent, setAppComponent] = useState(null)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    let isMounted = true

    import('./App.jsx')
      .then((module) => {
        if (isMounted) {
          setAppComponent(() => module.default)
        }
      })
      .catch((error) => {
        console.error('App module load error:', error)
        if (isMounted) {
          setLoadError(error)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (loadError) {
    return (
      <AppErrorState
        label="Module Load Error"
        title="Aplikasi gagal dimuat"
        description="Ada modul aplikasi yang tidak berhasil dimuat. Coba muat ulang aplikasi untuk melanjutkan."
        details={String(loadError?.message ?? loadError)}
        onRetry={() => window.location.reload()}
      />
    )
  }

  if (!AppComponent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--app-shell-bg)] text-[var(--app-text)]">
        Memuat aplikasi...
      </div>
    )
  }

  return <AppComponent />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RootErrorBoundary>
        <BrowserRouter>
          <AppLoader />
        </BrowserRouter>
      </RootErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
)
