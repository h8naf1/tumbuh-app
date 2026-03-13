function InputField({
  id,
  labelText,
  inputType = 'text',
  placeholderText = '',
  inputValue = '',
  onInputChange,
  rightSection,
  helperText,
  autoCompleteValue,
}) {
  let inputClassName =
    'w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-50 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15'

  if (rightSection) {
    inputClassName += ' pr-12'
  }

  return (
    <div className="w-full space-y-2">
      {labelText && (
        <label htmlFor={id} className="block text-sm font-semibold text-slate-200">
          {labelText}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholderText}
          value={inputValue}
          onChange={onInputChange}
          autoComplete={autoCompleteValue}
          className={inputClassName}
        />

        {rightSection && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {rightSection}
          </div>
        )}
      </div>

      {helperText && <p className="text-sm text-slate-400">{helperText}</p>}
    </div>
  )
}

export default InputField
