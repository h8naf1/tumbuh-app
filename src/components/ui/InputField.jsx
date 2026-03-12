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
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'

  if (rightSection) {
    inputClassName += ' pr-12'
  }

  return (
    <div className="w-full space-y-2">
      {labelText && (
        <label htmlFor={id} className="block text-sm font-semibold text-slate-700">
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

      {helperText && <p className="text-sm text-slate-500">{helperText}</p>}
    </div>
  )
}

export default InputField
