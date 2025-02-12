export const uploadImageToS3 = async (
  presignedUrl: string,
  imageFile: File | Blob
): Promise<{ ok: boolean; url: string }> => {
  try {
    if (!presignedUrl || !imageFile) {
      throw new Error('Presigned URL and image file are required')
    }

    if (!(imageFile instanceof File) && !(imageFile instanceof Blob)) {
      throw new Error('imageFile must be a File or Blob object')
    }

    const response = await fetch(presignedUrl, {
      method: 'PUT',
      body: imageFile,
      headers: {
        'Content-Type': imageFile.type || 'application/octet-stream',
      },
    })

    if (!response.ok) {
      throw new Error(`Image upload failed with status: ${response.status}`)
    }

    return {
      ok: response.ok,
      url: response.url.split('?')[0],
    }
  } catch (error) {
    throw error
  }
}
