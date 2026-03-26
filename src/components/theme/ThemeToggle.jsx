import { MoonStar, SunMedium } from 'lucide-react'
import { useTheme } from './ThemeProvider.jsx'

function ThemeToggle() {
  const { isDarkTheme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] px-3 text-sm font-medium text-[var(--app-text-soft)] transition hover:border-blue-400/40 hover:text-[var(--app-text)]"
      aria-label={isDarkTheme ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      title={isDarkTheme ? 'Mode terang' : 'Mode gelap'}
    >
      {isDarkTheme ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
      <span className="hidden sm:inline">{isDarkTheme ? 'Terang' : 'Gelap'}</span>
    </button>
  )
}

export default ThemeToggle
