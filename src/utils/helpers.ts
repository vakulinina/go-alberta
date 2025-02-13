/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const getVideoIdAndPlatform = (url: string) => {
  if (url.includes('youtube')) {
    const urlObj = new URL(url)
    const videoId = urlObj.searchParams.get('v')
    return { videoId, platform: 'youtube' }
  }

  if (url.includes('youtu.be')) {
    const videoId = url.split('/')[3].split('?')[0]
    return { videoId, platform: 'youtube' }
  }

  if (url.includes('vimeo')) {
    const videoId = url.split('/video/')[1].split('?')[0]
    return { videoId, platform: 'vimeo' }
  }

  return { videoId: '', platform: '' }
}

export const getVideoThumbnail = (url: string) => {
  const { videoId, platform } = getVideoIdAndPlatform(url)

  if (platform === 'youtube') {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }

  if (platform === 'vimeo') {
    return `https://vumbnail.com/${videoId}.jpg`
  }

  return ''
}

export const getVideoEmbedUrl = (url: string) => {
  const { videoId, platform } = getVideoIdAndPlatform(url)

  if (platform === 'youtube') {
    return `https://www.youtube.com/embed/${videoId}`
  }

  if (platform === 'vimeo') {
    return `https://player.vimeo.com/video/${videoId}`
  }

  return ''
}

export const isValidVideoUrl = (url: string) => {
  return (
    url.startsWith('https://www.youtube.com/') ||
    url.startsWith('https://youtu.be/') ||
    url.startsWith('https://vimeo.com/')
  )
}

export const debounce = (callback: (...args: any[]) => void, delay = 300) => {
  let timeoutId: NodeJS.Timeout | undefined

  return function (...args: unknown[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
