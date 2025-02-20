'use server'

import { addCampaignComment } from '@/api/campaignApi'
import { revalidatePath } from 'next/cache'

export async function addComment(formData: FormData, campaignId: number, userId: number) {
  const content = formData.get('comment')?.toString()

  if (!content?.trim()) {
    throw new Error('Comment cannot be empty')
  }

  try {
    const newComment = {
      commentText: content,
    }

    await addCampaignComment(newComment, campaignId, userId)

    revalidatePath(`/campaigns/${campaignId}/discussions`)
  } catch (error) {
    console.error('Error adding comment:', error)
    throw new Error('Failed to add comment')
  }
}
