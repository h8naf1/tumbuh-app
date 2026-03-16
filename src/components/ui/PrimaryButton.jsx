function PrimaryButton({
  children,
  buttonType = 'button',
  extraClassName = '',
  ...buttonProps
}) {
  const defaultButtonClassName =
    'inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_-20px_rgba(37,99,235,0.8)] transition hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-blue-900 disabled:text-slate-400'

  const finalButtonClassName = `${defaultButtonClassName} ${extraClassName}`.trim()

  return (
    <button type={buttonType} className={finalButtonClassName} {...buttonProps}>
      {children}
    </button>
  )
}

export default PrimaryButton
