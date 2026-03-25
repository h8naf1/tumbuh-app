function ProductImage({
  src,
  alt,
  label,
  tone = 'from-slate-200 via-slate-100 to-slate-300',
  className = 'w-10',
  imageClassName = '',
  roundedClassName = 'rounded-xl',
}) {
  return (
    <div
      className={`aspect-square ${className} overflow-hidden ${roundedClassName} bg-slate-800`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${imageClassName}`}
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${tone} text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700 shadow-inner shadow-white/20`}
          aria-hidden="true"
        >
          {label}
        </div>
      )}
    </div>
  )
}

export default ProductImage