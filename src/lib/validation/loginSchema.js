import { z } from 'zod'

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email dan password wajib diisi sebelum masuk.')
    .email('Email harus menggunakan format yang benar, misalnya nama@email.com.'),
  password: z.string().trim().min(1, 'Email dan password wajib diisi sebelum masuk.'),
  rememberMe: z.boolean(),
})

export default loginSchema
