export const generateUUID = () => {
  if (!crypto.randomUUID) {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  return crypto.randomUUID()
}

export const getUUID = () => {
  const localStorage = global?.window?.localStorage

  if (!localStorage) {
    console.error('localStorage is not available')
    return generateUUID()
  }

  let userId = localStorage.getItem('userId')

  if (!userId) {
    userId = generateUUID()
    localStorage.setItem('userId', userId)
  }

  return userId
}
