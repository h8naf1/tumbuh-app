function Input({ className = '', type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={`w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 ${className}`.trim()}
      {...props}
    />
  )
}

export default Input
