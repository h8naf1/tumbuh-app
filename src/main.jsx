import { Component, StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
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
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-50">
          <div className="w-full max-w-2xl rounded-2xl border border-red-500/20 bg-slate-900 p-6 shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
              Runtime Error
            </p>
            <h1 className="mt-3 text-2xl font-bold text-white">
              Aplikasi gagal dirender
            </h1>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-200">
              {String(this.state.error?.message ?? this.state.error)}
            </pre>
          </div>
        </div>
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
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-50">
        <div className="w-full max-w-2xl rounded-2xl border border-red-500/20 bg-slate-900 p-6 shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
            Module Load Error
          </p>
          <h1 className="mt-3 text-2xl font-bold text-white">
            App gagal dimuat
          </h1>
          <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-200">
            {String(loadError?.message ?? loadError)}
          </pre>
        </div>
      </div>
    )
  }

  if (!AppComponent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
        Memuat aplikasi...
      </div>
    )
  }

  return <AppComponent />
}

// Bootstrap utama aplikasi React.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrapper tema global aplikasi. */}
    <div data-theme="tumbuh">
      {/* Router utama untuk semua halaman. */}
      <RootErrorBoundary>
        <BrowserRouter>
          <AppLoader />
        </BrowserRouter>
      </RootErrorBoundary>
    </div>
  </StrictMode>,
)
