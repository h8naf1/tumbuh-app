import { CheckCircle2, Send } from 'lucide-react'

function HelpFormSuccess({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
      {/* Icon lingkaran sukses */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
          <CheckCircle2 className="h-9 w-9 text-emerald-400" />
        </div>
      </div>

      {/* Pesan sukses */}
      <div className="max-w-sm">
        <h3 className="text-xl font-bold text-white">Keluhan terkirim!</h3>
        <p className="mt-2.5 text-sm leading-6 text-slate-400">
          Terima kasih sudah melapor. Tim kami akan meninjau dan menghubungi Anda secepatnya.
        </p>
      </div>

      {/* Tombol kirim lagi */}
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/70 px-5 py-2.5 text-sm font-medium text-slate-300 transition duration-200 hover:border-slate-600 hover:bg-slate-800 hover:text-white"
      >
        <Send className="h-4 w-4" />
        Kirim Keluhan Lain
      </button>
    </div>
  )
}

export default HelpFormSuccess
