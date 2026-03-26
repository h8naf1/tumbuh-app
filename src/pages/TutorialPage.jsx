import React from 'react'
import { ArrowLeft, ArrowRight, Bot, ChartColumnBig, Map, Package, ReceiptText } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../layout/AuthLayout.jsx'
import { Button } from '../components/ui/Button.jsx'
import dashboardScreenshot from '../assets/elements/tutorial/dashboardpages.png'
import productScreenshot from '../assets/elements/tutorial/productpages.png'
import transactionScreenshot from '../assets/elements/tutorial/transaksipages.png'
import assistantScreenshot from '../assets/elements/tutorial/asistenchatpages.png'
import roadmapScreenshot from '../assets/elements/tutorial/roadmappages.png'

const tutorialSteps = [
  {
    id: 'dashboard',
    eyebrow: 'Langkah 1',
    title: 'Pahami ringkasan usaha dalam satu layar',
    description:
      'Dashboard membantu pengguna melihat penjualan harian, insight bisnis, dan transaksi terbaru dalam satu tampilan utama.',
    icon: ChartColumnBig,
    screenshot: dashboardScreenshot,
    bulletPoints: [
      'Lihat penjualan harian dan performa usaha lebih cepat.',
      'Baca insight bisnis yang sudah diringkas untuk keputusan harian.',
      'Pantau transaksi terbaru langsung dari halaman utama.',
    ],
    accentClassName: 'from-blue-500/18 via-blue-500/8 to-transparent',
  },
  {
    id: 'products',
    eyebrow: 'Langkah 2',
    title: 'Kelola menu dan stok dengan lebih rapi',
    description:
      'Menu Produk membantu pengguna mengelola daftar produk, memperbarui informasi item, dan memantau stok dengan lebih rapi.',
    icon: Package,
    screenshot: productScreenshot,
    bulletPoints: [
      'Tambah atau ubah produk tanpa proses yang rumit.',
      'Cek stok produk yang mulai menipis.',
      'Hapus beberapa produk sekaligus jika dibutuhkan.',
    ],
    accentClassName: 'from-cyan-500/16 via-cyan-500/8 to-transparent',
  },
  {
    id: 'transactions',
    eyebrow: 'Langkah 3',
    title: 'Catat transaksi lebih terstruktur setiap hari',
    description:
      'Halaman Transaksi membantu pengguna meninjau riwayat penjualan, memfilter data, dan memeriksa detail transaksi dengan lebih mudah.',
    icon: ReceiptText,
    screenshot: transactionScreenshot,
    bulletPoints: [
      'Filter transaksi untuk mengecek periode tertentu.',
      'Buka detail transaksi saat ingin meninjau penjualan.',
      'Gunakan data transaksi sebagai dasar evaluasi usaha.',
    ],
    accentClassName: 'from-emerald-500/16 via-emerald-500/8 to-transparent',
  },
  {
    id: 'assistant',
    eyebrow: 'Langkah 4',
    title: 'Gunakan Asisten Chat untuk kerja lebih cepat',
    description:
      'Asisten Chat membantu pengguna mencatat transaksi, scan barcode, dan upload nota dalam satu alur kerja yang lebih praktis.',
    icon: Bot,
    screenshot: assistantScreenshot,
    bulletPoints: [
      'Mulai chat dengan suggestion siap pakai di area tengah.',
      'Gunakan scan barcode untuk input produk lebih cepat.',
      'Upload nota lalu biarkan sistem menyiapkan draft awal.',
    ],
    accentClassName: 'from-violet-500/16 via-violet-500/8 to-transparent',
  },
  {
    id: 'roadmap',
    eyebrow: 'Langkah 5',
    title: 'Ikuti roadmap bisnis secara bertahap',
    description:
      'Roadmap Bisnis membantu pengguna memahami prioritas pengembangan usaha melalui tahapan yang lebih terarah dan checklist yang mudah diikuti.',
    icon: Map,
    screenshot: roadmapScreenshot,
    bulletPoints: [
      'Lihat tahapan perkembangan bisnis dari validasi hingga scaling.',
      'Centang checklist untuk mengikuti progres setiap tahap.',
      'Gunakan arahan roadmap untuk menentukan langkah berikutnya.',
    ],
    accentClassName: 'from-indigo-500/16 via-indigo-500/8 to-transparent',
  },
]

function TutorialPage() {
  const navigate = useNavigate()
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0)

  const currentStep = tutorialSteps[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === tutorialSteps.length - 1
  const progressPercent = Math.round(((currentStepIndex + 1) / tutorialSteps.length) * 100)

  function handleNextStep() {
    if (isLastStep) {
      navigate('/dashboard')
      return
    }

    setCurrentStepIndex((currentIndex) => currentIndex + 1)
  }

  function handlePreviousStep() {
    if (isFirstStep) {
      return
    }

    setCurrentStepIndex((currentIndex) => currentIndex - 1)
  }

  function handleSkipTutorial() {
    navigate('/dashboard')
  }

  const CurrentIcon = currentStep.icon

  return (
    <AuthLayout>
      <div className="mx-auto mt-4 w-full rounded-[1.75rem] border border-slate-800 bg-slate-900/88 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:mt-5 sm:p-6 lg:max-w-[92vw] lg:px-8 lg:py-7 2xl:max-w-[1500px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Tutorial Singkat
            </p>
            <h2 className="text-3xl font-black tracking-tight text-white">
              Kenali alur kerja TUMBUH lebih cepat
            </h2>
          </div>

          <button
            type="button"
            onClick={handleSkipTutorial}
            className="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-blue-500/30 hover:bg-slate-800 hover:text-white"
          >
            Lewati Tutorial
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Progress tutorial {currentStepIndex + 1}/{tutorialSteps.length}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Setelah selesai, Anda akan langsung masuk ke dashboard.
              </p>
            </div>
            <p className="text-2xl font-black text-blue-400">{progressPercent}%</p>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
          {tutorialSteps.map((step, index) => {
            const isActive = index === currentStepIndex
            const isCompleted = index < currentStepIndex

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStepIndex(index)}
                className={`min-h-[148px] rounded-2xl border px-5 py-4 text-left transition ${
                  isActive
                    ? 'border-blue-500/40 bg-blue-500/12'
                    : 'border-slate-800 bg-slate-950/55 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-xs font-semibold uppercase tracking-[0.16em] ${isActive ? 'text-blue-300' : 'text-slate-500'}`}>
                    {step.eyebrow}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${isCompleted ? 'bg-emerald-500/12 text-emerald-300' : isActive ? 'bg-blue-500/12 text-blue-300' : 'bg-slate-800 text-slate-400'}`}>
                    {isCompleted ? 'Selesai' : isActive ? 'Aktif' : 'Berikutnya'}
                  </span>
                </div>
                <p className={`mt-3 text-sm font-semibold leading-6 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {step.title}
                </p>
              </button>
            )
          })}
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[1.8rem] border border-slate-800 bg-[linear-gradient(180deg,rgba(15,23,42,0.95)_0%,rgba(2,6,23,0.98)_100%)] p-5 sm:p-6">
          <div className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-br ${currentStep.accentClassName}`} />

          <div className="relative grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)] xl:items-start">
            <div>
              <div className="max-w-[46rem]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/12 text-blue-400 shadow-[0_12px_28px_-18px_rgba(37,99,235,0.55)]">
                  <CurrentIcon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                  {currentStep.eyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-bold leading-tight text-white">
                  {currentStep.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                  {currentStep.description}
                </p>
              </div>

              <div className="mt-5 overflow-hidden rounded-[1.6rem] border border-slate-800 bg-slate-950/60 shadow-[0_18px_40px_-22px_rgba(2,6,23,0.85)]">
                <img
                  src={currentStep.screenshot}
                  alt={currentStep.title}
                  className="block h-auto w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 xl:sticky xl:top-6">
              <p className="text-sm font-semibold text-white">Yang bisa Anda lakukan</p>
              <div className="mt-3 space-y-3">
                {currentStep.bulletPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/65 px-3 py-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-400" />
                    <p className="text-sm leading-6 text-slate-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/personalisasi-bisnis" className="text-sm font-medium text-slate-400 transition hover:text-slate-200">
            Kembali ke personalisasi bisnis
          </Link>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="outline"
              onClick={handlePreviousStep}
              disabled={isFirstStep}
              className="h-11 rounded-xl border-slate-800 bg-slate-950/70 px-4 text-slate-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>

            <Button type="button" className="h-11 rounded-xl px-5 text-base font-semibold" onClick={handleNextStep}>
              {isLastStep ? 'Masuk ke Dashboard' : 'Lanjut'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default TutorialPage
