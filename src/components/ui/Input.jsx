function Input({ className = '', type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 ${className}`.trim()}
      {...props}
    />
  )
}

export default Input
