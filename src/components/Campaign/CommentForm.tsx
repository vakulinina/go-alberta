'use client'

import { useCallback, useState } from 'react'
import { Button } from '../Button'
import Image from 'next/image'
import avatar from '../../images/avatar.svg'
import { Comment } from '@/types/campaign'
import { addComment } from '@/actions'
import { useAuth } from '@/context/AuthContext'

export const CommentForm = ({ campaignId }: { campaignId: number }) => {
  const { user } = useAuth()
  const [comment, setComment] = useState('')

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      if (!user) return
      await addComment(formData, campaignId, user.userId)
    },
    [campaignId, user]
  )

  if (!user) {
    return null
  }

  return (
    <form
      action={handleSubmit}
      className="mb-[40px] flex flex-col gap-[16px] rounded-lg border border-[#80CD57] p-[20px] shadow-md"
    >
      <div className="flex items-center">
        {/* TODO: replace with proper User Avatar component when implemented */}
        <Image className="mr-[8px] shrink-0 rounded-full" src={avatar} alt="" width={40} height={40} />
        <p className="text-[20px]">User Name</p>
      </div>
      <textarea
        value={comment}
        name="comment"
        onChange={handleChange}
        className="border-[rgba(0, 0, 0, 0.40)] w-full rounded-none border-b pb-[16px] text-[14px]"
        placeholder="Write a comment..."
      />
      <Button className="self-end" type="submit">
        Comment
      </Button>
    </form>
  )
}

export const CommentList = ({ initialComments }: { initialComments: Comment[] }) => {
  return (
    <>
      {initialComments.length > 0 &&
        initialComments?.map(({ commentId, commenterName, commentText, createdAt }) => (
          <div key={commentId} className="mb-[40px] flex flex-col gap-[16px]">
            <div className="mb-[16px] flex items-center">
              <Image
                className="mr-[10px] shrink-0 rounded-full"
                src={avatar}
                alt={commenterName || ''}
                width={40}
                height={40}
              />
              <p className="text-[20px] font-bold">{commenterName}</p>
            </div>

            <p className="text-[16px]">{commentText}</p>
            {createdAt && <p className="text-[14px] text-[#9B9B9B]">{new Date(createdAt).toDateString()}</p>}
          </div>
        ))}
    </>
  )
}
