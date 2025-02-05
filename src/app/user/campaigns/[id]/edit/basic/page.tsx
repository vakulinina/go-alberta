'use client'

import { TextArea } from '@/components/TextArea'
import { Input } from '@/components/Inputs/Input'
import { useCampaign } from '@/context/CampaignContext'
import { useCallback, useState } from 'react'
import { Dropdown } from '@/components/Dropdown'
import { Toggle } from '../../../../../../components/Toggle'
import { CampaignQna } from '@/components/CampaignQna'
import { ImageGallery } from '@/components/ImageGallery'
import { FileInput } from '@/components/FileInput'
import { Button } from '@/components/Button'
import { getVideoThumbnail } from '@/utils/helpers'
import Image from 'next/image'

const fields = {
  title: {
    name: 'title',
    label: 'Title*',
  },
  description: {
    name: 'campaignDesc',
    label: 'Description*',
  },
  category: {
    name: 'categoryId',
    label: 'Category*',
  },
  qna: {
    name: 'qnaList',
    label: 'Q&A*',
  },
  cardImage: {
    name: 'coverPic',
    label: 'Card Image*',
  },
  imageGallery: {
    name: '',
    label: 'Image Gallery*',
  },
  video: {
    name: 'video',
    label: 'Video',
  },
}

export default function CampaignEditBasicPage() {
  const {
    state: { campaign, categories },
    handleChange,
    uploadImages,
    removeImage,
    handleQnaChange,
    uploadVideo,
    uploadCoverImage,
  } = useCampaign()
  const [mediaType, setMediaType] = useState('image')
  const [videoUrl, setVideoUrl] = useState('')
  const [selectedCoverPic, setSelectedCoverPic] = useState<File>()

  const handleGalleryImageChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        await uploadImages(Array.from(event.target.files || []))
      }
    },
    [uploadImages]
  )

  const handleCoverFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        await uploadCoverImage(event.target.files[0])
        setSelectedCoverPic(event.target.files[0])
      }
    },
    [uploadCoverImage]
  )

  const handleVideoChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      uploadVideo(videoUrl)
      setVideoUrl('')
    },
    [uploadVideo, videoUrl]
  )

  const mediaItems =
    campaign?.media?.map((mediaItem) => ({
      ...mediaItem,
      imageUrl:
        mediaItem.imageType === 0
          ? process.env.NEXT_PUBLIC_S3_BUCKET_URL + '/' + mediaItem.imageUrl
          : getVideoThumbnail(mediaItem.imageUrl),
    })) || []

  const coverImageUrl = selectedCoverPic
    ? URL.createObjectURL(selectedCoverPic)
    : campaign?.coverPic
      ? process.env.NEXT_PUBLIC_S3_BUCKET_URL + '/' + campaign.coverPic
      : undefined

  return (
    <>
      <p className="text-[20px]">This section is related to basic information that is needed for your campaign.</p>

      <label htmlFor="title" className="mt-[42px] block text-[32px]">
        {fields.title.label}
      </label>
      <p className="mt-[16px] text-[20px]">Write a title for your Campaign.</p>
      <Input
        name="title"
        placeholder="Title"
        className="mt-[16px] w-full"
        defaultValue={campaign.title}
        onChange={handleChange}
      />

      <label htmlFor="description" className="mt-[42px] block text-[32px]">
        {fields.description.label}
      </label>
      <p className="mt-[16px] text-[20px]">
        Write a brief description which helps investors find out more about the project.
      </p>
      <TextArea
        name={fields.description.name}
        placeholder="Description"
        className="mt-[16px] w-full"
        defaultValue={campaign.campaignDesc}
        onChange={handleChange}
      />

      <label htmlFor="cardImage" className="mt-[42px] block text-[32px]">
        {fields.cardImage.label}
      </label>
      <p className="mt-[16px] text-[20px]">
        Upload one image that will be displayed as the main preview image for your campaign.
        <br /> 255 x 255 minimum resolution. Maximum file size: 150KB.
      </p>
      <FileInput
        onChange={handleCoverFileChange}
        label={`${coverImageUrl ? 'Change' : 'Upload'} Card Image`}
        id="cardImage"
      />
      {coverImageUrl && (
        <div className="mt-4">
          <Image src={coverImageUrl} alt="" className="h-[255px] w-[255px] object-cover" width={255} height={255} />
        </div>
      )}

      <Toggle
        values={[
          { key: 'image', title: 'Image' },
          { key: 'video', title: 'Video' },
        ]}
        activeValue={mediaType}
        onSelect={setMediaType}
        className="mt-[42px]"
      />

      {mediaType === 'image' && (
        <>
          <label htmlFor="image" className="mt-[42px] block text-[32px]">
            {fields.imageGallery.label}
          </label>
          <p className="mt-[16px] text-[20px]">
            Upload one or more images to appear at the top of your campaign page.
            <br />
            Maximum file size: 150KB.
          </p>
          <FileInput onChange={handleGalleryImageChange} label="Upload Image" multiple id="imageGallery" />
        </>
      )}

      {mediaType === 'video' && (
        <>
          <label htmlFor="video" className="mt-[42px] block text-[32px]">
            {fields.video.label}
          </label>
          <p className="mt-[16px] text-[20px]">Enter a YouTube URL to appear at the top of your campaign page.</p>
          <div className="flex items-center gap-2">
            <Input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              name="video"
              placeholder="http://"
              className="mt-[16px] w-full"
            />
            <Button className="mt-[16px]" onClick={handleVideoChange}>
              Add Video
            </Button>
          </div>
        </>
      )}

      {campaign?.media && <ImageGallery media={mediaItems} onRemove={removeImage} />}

      <label htmlFor="category" className="mt-[42px] block text-[32px]">
        {fields.category.label}
      </label>
      <p className="mt-[16px] text-[20px]">
        Select a category that best represents your project. This will be used in filtering the campaigns.
      </p>
      <Dropdown
        name="categoryId"
        className="mt-[16px]"
        options={categories}
        selectedOption={campaign.categoryId}
        onChange={handleChange}
      />

      <p className="mt-[42px] text-[32px]">{fields.qna.label}</p>
      <p className="mt-[16px] text-[20px]">
        Q&A should provide the most common details that backers are looking for when evaluating your campaign.
      </p>

      <CampaignQna qnaItems={campaign.qnaList} onChange={handleQnaChange} />
    </>
  )
}
