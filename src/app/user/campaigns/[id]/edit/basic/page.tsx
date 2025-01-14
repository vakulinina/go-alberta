'use client'

import { Button } from '@/components/Button'
import { TextArea } from '@/components/TextArea'
import { Input } from '@/components/Inputs/Input'
import { useCampaign } from '@/context/CampaignContext'
import { Fragment, useState } from 'react'

interface ToggleProps {
  values: { key: string; title: string }[]
  onSelect: (key: string) => void
  className?: string
  activeValue: string
}

const Dropdown = ({ className }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`relative w-full ${className}`}>
    <select name="category" className="w-full rounded-lg border border-[##BABABA] p-3" required>
      <option value="1">Category 1</option>
      <option value="2">Category 2</option>
      <option value="3">Category 3</option>
    </select>
  </div>
)

const Toggle = ({ values, onSelect, className, activeValue }: ToggleProps) => (
  <div className={`flex ${className}`}>
    {values.map(({ key, title }) => (
      <button
        key={key}
        onClick={() => onSelect(key)}
        type="button"
        className={`flex h-[40px] w-[136px] items-center justify-center border bg-[#E1E1E1] text-[20px] text-[#8F8F8F] ${
          key === activeValue && 'border-[3px] border-[#88BE3C] bg-[#FFFFFF] !text-[#000000]'
        }`}
      >
        {title}
      </button>
    ))}
  </div>
)

export default function CampaignEditBasicPage() {
  const { campaign } = useCampaign()
  const [mediaType, setMediaType] = useState('image')

  return (
    <>
      <p className="text-[20px]">This section is related to basic information that is needed for your campaign.</p>

      <label htmlFor="title" className="mt-[42px] block text-[32px]">
        Title*
      </label>
      <p className="mt-[16px] text-[20px]">Write a title for your Campaign.</p>
      <Input name="title" placeholder="Title" className="mt-[16px] w-full" defaultValue={campaign?.title} />

      <label htmlFor="description" className="mt-[42px] block text-[32px]">
        Description*
      </label>
      <p className="mt-[16px] text-[20px]">
        Write a brief description which helps investors find out more about the project.
      </p>
      <TextArea
        name="description"
        placeholder="Description"
        className="mt-[16px] w-full"
        defaultValue={campaign?.description}
      />

      <Toggle
        values={[
          { key: 'image', title: 'Image' },
          { key: 'video', title: 'Video' },
        ]}
        activeValue={mediaType}
        onSelect={setMediaType}
        className="mt-[42px]"
      />

      {mediaType === 'video' && (
        <>
          <label htmlFor="video" className="mt-[42px] block text-[32px]">
            Video URL
          </label>
          <p className="mt-[16px] text-[20px]">Enter a YouTube URL to appear at the top of your campaign page.</p>
          <Input name="video" placeholder="http://" className="mt-[16px] w-full" />
        </>
      )}

      {mediaType === 'image' && (
        <>
          <label htmlFor="image" className="mt-[42px] block text-[32px]">
            Image*
          </label>
          <p className="mt-[16px] text-[20px]">Upload one or more images to appear at the top of your campaign page.</p>
          <Button className="mt-[16px]" variant="secondary">
            Upload Image
          </Button>
        </>
      )}

      <label htmlFor="category" className="mt-[42px] block text-[32px]">
        Category*
      </label>
      <p className="mt-[16px] text-[20px]">
        Select a category that best represents your project. This will be used in filtering the campaigns.
      </p>
      <Dropdown className="mt-[16px]" />

      <p className="mt-[42px] text-[32px]">Q&A*</p>
      <p className="mt-[16px] text-[20px]">
        Q&A should provide the most common details that backers are looking for when evaluating your campaign.
      </p>

      {campaign?.qna?.map(({ question, answer }) => (
        <Fragment key={question}>
          <label htmlFor="question" className="mt-[16px] block text-[20px]">
            Question
          </label>
          <TextArea name="question" className="mt-[6px] w-full" defaultValue={question} />

          <label htmlFor="answer" className="mt-[16px] block text-[20px]">
            Answer
          </label>
          <TextArea name="answer" className="mt-[6px] w-full" defaultValue={answer} />
        </Fragment>
      ))}

      <button type="button" className="pt-[6px] text-[20px] hover:text-[#131313C9]">
        ➕ Add more questions
      </button>
    </>
  )
}
