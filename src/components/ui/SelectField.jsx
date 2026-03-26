import { ChevronDown } from 'lucide-react'

function SelectField({
  label,
  className = '',
  wrapperClassName = '',
  children,
  ...props
}) {
  return (
    <label className={`block ${wrapperClassName}`.trim()}>
      {label ? (
        <span className="mb-2 block text-sm font-medium text-[var(--app-text-soft)]">{label}</span>
      ) : null}

      <div className="relative">
        <select
          {...props}
          className={`h-11 w-full appearance-none rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] px-4 pr-11 text-sm text-[var(--app-text)] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 ${className}`.trim()}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--app-text-muted)]" />
      </div>
    </label>
  )
}

export default SelectField
