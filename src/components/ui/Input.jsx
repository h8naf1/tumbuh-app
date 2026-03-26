function Input({ className = '', type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={`w-full rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-3 text-sm text-[var(--app-text)] outline-none transition placeholder:text-[var(--app-text-muted)] focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 ${className}`.trim()}
      {...props}
    />
  )
}

export default Input
