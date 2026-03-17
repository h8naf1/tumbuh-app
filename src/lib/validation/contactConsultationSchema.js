import { z } from 'zod'

const consultationDateRegex = /^\d{2}\/\d{2}\/\d{4}$/

function isValidCalendarDate(value) {
  const [dayString, monthString, yearString] = value.split('/')
  const day = Number(dayString)
  const month = Number(monthString)
  const year = Number(yearString)

  const date = new Date(year, month - 1, day)

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

function isTodayOrFuture(value) {
  const [dayString, monthString, yearString] = value.split('/')
  const day = Number(dayString)
  const month = Number(monthString)
  const year = Number(yearString)

  const selectedDate = new Date(year, month - 1, day)
  const today = new Date()

  today.setHours(0, 0, 0, 0)
  selectedDate.setHours(0, 0, 0, 0)

  return selectedDate >= today
}

const contactConsultationSchema = z
  .object({
    firstName: z.string().trim().min(1, 'Nama depan wajib diisi.'),
    lastName: z.string().trim().min(1, 'Nama belakang wajib diisi.'),
    email: z
      .string()
      .trim()
      .min(1, 'Email wajib diisi.')
      .email('Email harus menggunakan format yang benar, misalnya nama@email.com.'),
    preferredDate: z
      .string()
      .trim()
      .min(1, 'Tanggal konsultasi wajib diisi.')
      .regex(consultationDateRegex, 'Gunakan format tanggal dd/mm/yyyy.'),
    message: z
      .string()
      .trim()
      .min(10, 'Pesan minimal 10 karakter agar kami bisa memahami kebutuhan Anda.'),
  })
  .refine((data) => isValidCalendarDate(data.preferredDate), {
    path: ['preferredDate'],
    message: 'Tanggal yang Anda masukkan belum valid.',
  })
  .refine((data) => isTodayOrFuture(data.preferredDate), {
    path: ['preferredDate'],
    message: 'Tanggal konsultasi tidak boleh lebih awal dari hari ini.',
  })

export default contactConsultationSchema
