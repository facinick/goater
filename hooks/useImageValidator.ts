import { useEffect, useState } from 'react'

const useImageValidator = (url: string) => {
  const [isValid, setIsValid] = useState<boolean>(false)

  useEffect(() => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = () => {
      setIsValid(
        xhr.status === 200 &&
          xhr.getResponseHeader('Content-Type')!.includes('image')
      )
    }
    xhr.onerror = () => {
      setIsValid(false)
    }
    xhr.send()
  }, [url])

  return isValid
}

const isImageValid = async (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = () => {
      resolve(
         xhr.status === 200 &&
          xhr.getResponseHeader('Content-Type')!.includes('image')
      )
    }
    xhr.onerror = () => {
      resolve(false)
    }
    xhr.onabort = () => {
      resolve(false)
    }
    xhr.ontimeout = () => {
      resolve(false)
    }
    xhr.send()
  })
}

export { isImageValid, useImageValidator }
