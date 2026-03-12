function PrimaryButton({
  children,
  buttonType = 'button',
  extraClassName = '',
  ...buttonProps
}) {
  const defaultButtonClassName =
    'inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-blue-300'

  const finalButtonClassName = `${defaultButtonClassName} ${extraClassName}`.trim()

  return (
    <button type={buttonType} className={finalButtonClassName} {...buttonProps}>
      {children}
    </button>
  )
}

export default PrimaryButton
