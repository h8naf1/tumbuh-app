import { z } from 'zod'

const contactConsultationSchema = z.object({
  firstName: z.string().trim().min(1, 'Nama depan wajib diisi.'),
  lastName: z.string().trim().min(1, 'Nama belakang wajib diisi.'),
  email: z
    .string()
    .trim()
    .min(1, 'Email wajib diisi.')
    .email('Email harus menggunakan format yang benar, misalnya nama@email.com.'),
  message: z
    .string()
    .trim()
    .min(10, 'Pesan minimal 10 karakter agar kami bisa memahami kebutuhan Anda.'),
})

export default contactConsultationSchema
