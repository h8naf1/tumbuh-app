function BrandLogo({
  alt = 'Logo TUMBUH',
  className = 'h-12 w-auto',
  imageClassName = 'block h-full w-auto object-contain',
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/img/logo tumbuh new.svg"
        alt={alt}
        className={imageClassName}
      />
    </div>
  )
}

export default BrandLogo
