import { useEffect, useState } from 'react'

function useFormToast() {
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    if (!toastMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage('')
    }, 3500)

    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  function showToast(message) {
    setToastMessage(message)
  }

  function clearToast() {
    setToastMessage('')
  }

  function showFirstFormError(formErrors) {
    const firstErrorMessage = Object.values(formErrors)[0]?.message

    if (firstErrorMessage) {
      showToast(firstErrorMessage)
    }
  }

  return {
    toastMessage,
    showToast,
    clearToast,
    showFirstFormError,
  }
}

export default useFormToast
