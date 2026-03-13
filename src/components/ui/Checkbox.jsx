import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

function Checkbox({ className = '', ...props }) {
  return (
    <CheckboxPrimitive.Root
      className={`flex h-4 w-4 items-center justify-center rounded border border-slate-700 bg-slate-950 text-blue-400 shadow-sm outline-none transition focus:ring-4 focus:ring-blue-500/20 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white ${className}`.trim()}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.5 8L6.5 11L12.5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export default Checkbox
