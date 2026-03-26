import { useEffect, useMemo, useState } from 'react'

function TextType({
  texts,
  typingSpeed = 90,
  deletingSpeed = 55,
  pauseDuration = 1400,
  loop = false,
  className = '',
  showCursor = true,
  cursorCharacter = '|',
}) {
  const safeTexts = useMemo(() => {
    const normalizedTexts = Array.isArray(texts) ? texts : [texts]
    return normalizedTexts.filter((text) => typeof text === 'string' && text.length > 0)
  }, [texts])

  const [textIndex, setTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (safeTexts.length === 0) {
      return undefined
    }

    const currentText = safeTexts[textIndex] ?? safeTexts[0]

    if (!isDeleting && displayText === currentText) {
      if (!loop && textIndex === safeTexts.length - 1) {
        return undefined
      }

      const pauseTimer = window.setTimeout(() => {
        setIsDeleting(true)
      }, pauseDuration)

      return () => window.clearTimeout(pauseTimer)
    }

    if (isDeleting && displayText.length === 0) {
      setIsDeleting(false)
      setTextIndex((currentIndex) => {
        const nextIndex = currentIndex + 1
        return nextIndex >= safeTexts.length ? 0 : nextIndex
      })
      return undefined
    }

    const nextText = isDeleting
      ? currentText.slice(0, Math.max(displayText.length - 1, 0))
      : currentText.slice(0, displayText.length + 1)

    const stepTimer = window.setTimeout(() => {
      setDisplayText(nextText)
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => window.clearTimeout(stepTimer)
  }, [
    deletingSpeed,
    displayText,
    isDeleting,
    loop,
    pauseDuration,
    safeTexts,
    textIndex,
    typingSpeed,
  ])

  if (safeTexts.length === 0) {
    return null
  }

  return (
    <span className={className}>
      {displayText}
      {showCursor ? (
        <span className="ml-0.5 inline-block animate-pulse text-cyan-200/90">
          {cursorCharacter}
        </span>
      ) : null}
    </span>
  )
}

export default TextType
