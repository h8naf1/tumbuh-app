import { cn } from '@/lib/utils'

function Field({ className, ...props }) {
  return <div data-slot="field" className={cn('grid gap-2', className)} {...props} />
}

function FieldLabel({ className, ...props }) {
  return (
    <label
      data-slot="field-label"
      className={cn('text-sm font-medium text-slate-200', className)}
      {...props}
    />
  )
}

export { Field, FieldLabel }
