'use client'

import { Button } from '@/components/Button'
import { TextArea } from '@/components/TextArea'
import { Input } from '@/components/Inputs/Input'
import { useCampaign } from '@/context/CampaignContext'
import { Fragment, useState } from 'react'
import { Dropdown } from '@/components/Dropdown'
import { Toggle } from '../../../../../../components/Toggle'

// TODO: if the campaign is in Approved status, editing is not allowed

const Qna = ({
  question,
  answer,
  onChange,
  ...props
}: {
  question: string
  answer: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}) => (
  <Fragment {...props}>
    <label htmlFor="question" className="mt-[16px] block text-[20px]">
      Question
    </label>
    <TextArea name="question" className="mt-[6px] w-full" defaultValue={question} onChange={onChange} />

    <label htmlFor="answer" className="mt-[16px] block text-[20px]">
      Answer
    </label>
    <TextArea name="answer" className="mt-[6px] w-full" defaultValue={answer} onChange={onChange} />
  </Fragment>
)

export default function CampaignEditBasicPage() {
  const { formData, handleChange } = useCampaign()
  const [mediaType, setMediaType] = useState('image')

  return (
    <>
      <p className="text-[20px]">This section is related to basic information that is needed for your campaign.</p>

      <label htmlFor="title" className="mt-[42px] block text-[32px]">
        Title*
      </label>
      <p className="mt-[16px] text-[20px]">Write a title for your Campaign.</p>
      <Input
        name="title"
        placeholder="Title"
        className="mt-[16px] w-full"
        defaultValue={formData.title}
        onChange={handleChange}
      />

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
        defaultValue={formData.description}
        onChange={handleChange}
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
      <Dropdown
        name="category"
        className="mt-[16px]"
        options={[
          { id: 1, label: 'Fashion' },
          { id: 2, label: 'Tech' },
          { id: 3, label: 'Education' },
        ]}
        selectedOption={formData.categoryId}
        onChange={handleChange}
      />

      <p className="mt-[42px] text-[32px]">Q&A*</p>
      <p className="mt-[16px] text-[20px]">
        Q&A should provide the most common details that backers are looking for when evaluating your campaign.
      </p>

      {formData.qna?.length === 0 ? (
        <Qna question="" answer="" onChange={handleChange} />
      ) : (
        formData.qna?.map(({ question, answer }) => (
          <>
            <Qna key={question} question={question} answer={answer} onChange={handleChange} />
            <Button className="mt-[16px]" variant="secondary">
              Delete
            </Button>
            {/* Make a small button */}
          </>
        ))
      )}

      <button type="button" className="pt-[6px] text-[20px] hover:text-[#131313C9]">
        ➕ Add more questions
      </button>
    </>
  )
}

// TODO: add onChange for QnA
// TODO: image/video upload
