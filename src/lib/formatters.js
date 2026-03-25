// Formatter angka ke mata uang rupiah yang bisa dipakai lintas halaman.
export function formatRupiah(value) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(Number(value) || 0)}`
}
