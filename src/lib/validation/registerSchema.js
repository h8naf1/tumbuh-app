import { z } from 'zod'

const registerSchema = z
  .object({
    fullName: z.string().trim().min(1, 'Semua kolom wajib diisi sebelum membuat akun.'),
    email: z
      .string()
      .trim()
      .min(1, 'Semua kolom wajib diisi sebelum membuat akun.')
      .email('Email harus menggunakan format yang benar, misalnya nama@email.com.'),
    password: z.string().trim().min(1, 'Semua kolom wajib diisi sebelum membuat akun.'),
    confirmPassword: z.string().trim().min(1, 'Semua kolom wajib diisi sebelum membuat akun.'),
    termsAccepted: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Kata sandi dan konfirmasi kata sandi harus sama.',
  })
  .refine((data) => data.termsAccepted, {
    path: ['termsAccepted'],
    message: 'Anda perlu menyetujui syarat dan ketentuan terlebih dahulu.',
  })

export default registerSchema
