import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import HelpForm from './HelpForm.jsx'
import HelpInfoPanel from './HelpInfoPanel.jsx'

/**
 * Modal Pusat Bantuan — muncul saat user mengklik tombol "Pusat Bantuan".
 * Tidak memerlukan navigasi halaman; konten di-render di atas page yang aktif.
 *
 * Props:
 *   isOpen   — boolean, apakah modal ditampilkan
 *   onClose  — fungsi untuk menutup modal
 */
function HelpCenterModal({ isOpen, onClose }) {
  const dialogRef = useRef(null)
  const closeBtnRef = useRef(null)

  // Tutup dengan tombol Escape & kunci fokus di dalam modal
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    // Scroll body dikunci saat modal terbuka
    document.body.style.overflow = 'hidden'

    // Auto-fokus ke tombol tutup saat terbuka
    closeBtnRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm"
        style={{ animation: 'fadeIn 0.18s ease-out' }}
      />

      {/* ── Panel modal ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Pusat Bantuan"
        ref={dialogRef}
        className="fixed inset-x-0 bottom-0 z-50 flex flex-col sm:inset-0 sm:items-center sm:justify-center sm:p-4"
        style={{ animation: 'slideUp 0.22s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[1.6rem] border border-slate-800/90 bg-slate-950 shadow-[0_-24px_80px_-16px_rgba(2,6,23,0.85)] sm:max-h-[88dvh] sm:max-w-[860px] sm:rounded-[1.6rem] sm:shadow-[0_32px_80px_-20px_rgba(2,6,23,0.90)]">
          {/* Top accent line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/35 to-transparent" />

          {/* ── Header modal ── */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-800/80 px-6 py-4">
            <div>
              <h2 className="text-base font-bold text-white sm:text-[1.05rem]">
                Apa yang bisa kami bantu?
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Tim kami akan merespons secepat mungkin.
              </p>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Tutup Pusat Bantuan"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-800 text-slate-400 transition duration-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* ── Body scrollable ── */}
          <div className="overflow-y-auto overscroll-contain">
            <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-8 lg:p-7">
              {/* Form */}
              <div>
                <HelpForm onSuccess={onClose} />
              </div>
              {/* Info panel — hanya tampil di layar lebih lebar */}
              <div className="hidden lg:block lg:pt-1">
                <HelpInfoPanel />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Animasi lokal ── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0)    scale(1);     }
        }
      `}</style>
    </>
  )
}

export default HelpCenterModal
