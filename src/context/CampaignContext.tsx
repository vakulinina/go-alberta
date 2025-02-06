'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import {
  addPerk,
  deleteCampaignImage,
  deletePerk,
  getCampaignById,
  getCampaignCategories,
  getCampaignMedia,
  getCampaignPerks,
  getCampaignQna,
  updateCampaign,
  updateCampaignMedia,
  updateCampaignQna,
  updateCampaignStatus,
  uploadImageToS3,
} from '@/api/campaignApi'
import { Campaign, MediaItem, Perk, Qna } from '@/types/campaign'
import { usePathname, useRouter } from 'next/navigation'
import {
  INITIAL_CAMPAIGN_DATA,
  INITIAL_PERK_DATA,
  INITIAL_QNA_DATA,
  INVALID_IMAGE_ERROR,
  isValidImageFormat,
  isValidImageSize,
  REQUIRED_FIELDS,
  stepConfig,
} from './constants'
import { isValidVideoUrl } from '@/utils/helpers'
import { CampaignContextType, ErrorState } from './types'

const CampaignContext = createContext<CampaignContextType | undefined>(undefined)

const getCurrentStepIndex = (id: number, pathname: string) => {
  return stepConfig.findIndex((step) => step.path(id).includes(pathname)) || 0
}

export function CampaignProvider({ children, id }: { children: React.ReactNode; id: number }) {
  const { push } = useRouter()
  const pathname = usePathname()

  const [modifiedFields, setModifiedFields] = useState<Set<keyof Campaign>>(new Set())
  const [errors, setErrors] = useState<ErrorState>({})
  const [state, setState] = useState<CampaignContextType['state']>({
    campaign: INITIAL_CAMPAIGN_DATA,
    currentStepIndex: getCurrentStepIndex(id, pathname),
    isLastStep: getCurrentStepIndex(id, pathname) === stepConfig.length - 1,
    isFirstStep: getCurrentStepIndex(id, pathname) === 0,
    categories: [],
    loading: false,
  })
  const { campaign, currentStepIndex, isLastStep } = state

  useEffect(() => {
    const fetchCampaignData = async () => {
      const campaignData = await getCampaignById(id)
      if (!campaignData) return

      setState((prev) => ({ ...prev, loading: true }))
      try {
        const [qnaList, perks, media] = await Promise.all([
          getCampaignQna(id),
          getCampaignPerks(id),
          getCampaignMedia(id),
        ])

        const campaignToSet = {
          ...campaignData,
          qnaList: qnaList.length > 0 ? qnaList : [{ ...INITIAL_QNA_DATA }],
          perks: perks.length > 0 ? perks : [{ ...INITIAL_PERK_DATA, campaignId: campaignData.campaignId }],
          media,
        }

        setState((prev) => ({ ...prev, campaign: campaignToSet, loading: false }))
      } catch (error) {
        throw error
      } finally {
        setState((prev) => ({ ...prev, loading: false }))
      }
    }

    const fetchCategories = async () => {
      const categories = await getCampaignCategories()
      setState((prev) => ({ ...prev, categories }))
    }

    fetchCampaignData()
    fetchCategories()
  }, [id])

  const clearErrors = useCallback((field?: keyof Campaign) => {
    if (field) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    } else {
      setErrors({})
    }
  }, [])

  const setFieldError = useCallback((field: keyof Campaign | 'general', message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }))
  }, [])

  const validateRequiredFields = useCallback((campaign: Campaign) => {
    const newErrors: ErrorState = {}

    Object.entries(REQUIRED_FIELDS).forEach(([key, label]) => {
      if (key === 'qnaList' || key === 'perks') {
        const hasValidItems = {
          qnaList: campaign.qnaList?.some((qna) => qna.question && qna.answer),
          perks: campaign.perks?.some((perk) => perk.perkText && perk.perkAmount),
        }

        if (!hasValidItems[key as 'qnaList' | 'perks']) {
          newErrors[key as keyof Campaign] = `${label} is required`
        }
      }

      if (!campaign[key as keyof Campaign]) {
        newErrors[key as keyof Campaign] = `${label} is required`
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      throw new Error('Please fill in all required fields')
    }

    return true
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setModifiedFields((prev) => prev.add(name as keyof Campaign))

      setState((prev) => ({
        ...prev,
        campaign: {
          ...prev.campaign,
          [name]: name === 'categoryId' ? Number(value) : value,
        },
      }))
    },
    []
  )

  const handleQnaChange = useCallback((qnaList: Qna[]) => {
    setModifiedFields((prev) => prev.add('qnaList'))

    setState((prev) => ({
      ...prev,
      campaign: {
        ...prev.campaign,
        qnaList,
      },
    }))
  }, [])

  const handlePerkChange = useCallback(
    async (index: number, perk?: Perk) => {
      if (!campaign.perks === undefined) return

      setModifiedFields((prev) => prev.add('perks'))

      if (!perk) {
        const perkToRemove = campaign.perks?.[index]
        if (perkToRemove?.perkId) {
          await deletePerk(state.campaign.campaignId, perkToRemove.perkId)
        }
        setState((prev) => ({
          ...prev,
          campaign: {
            ...prev.campaign,
            perks: prev.campaign.perks?.filter((_, i) => i !== index),
          },
        }))
        return
      }

      setState((prev) => ({
        ...prev,
        campaign: {
          ...prev.campaign,
          perks:
            index === prev.campaign.perks?.length
              ? [...(prev.campaign.perks || []), perk] // Add new perk
              : prev.campaign.perks?.map((p, i) => (i === index ? perk : p)), // Update existing perk
        },
      }))
    },
    [campaign.perks, state.campaign.campaignId]
  )

  const goToStep = useCallback(
    (index: number) => {
      if (!campaign.campaignId || index < 0 || index >= stepConfig.length) return
      setState((prev) => ({
        ...prev,
        currentStepIndex: index,
        isLastStep: index === stepConfig.length - 1,
        isFirstStep: index === 0,
      }))
      push(stepConfig[index].path(campaign.campaignId))
    },
    [campaign.campaignId, push]
  )

  const nextStep = useCallback(() => goToStep(currentStepIndex + 1), [currentStepIndex, goToStep])
  const prevStep = useCallback(() => goToStep(currentStepIndex - 1), [currentStepIndex, goToStep])

  const saveCampaign = useCallback(async () => {
    if (!campaign.campaignId) throw new Error('No campaign ID found')

    if (modifiedFields.size === 0) {
      if (isLastStep) {
        push('/user/campaigns/my')
      } else {
        nextStep()
      }
      return
    }

    setState((prev) => ({ ...prev, loading: true }))

    try {
      const fieldsToUpdate = Object.entries(campaign).reduce<Partial<Campaign>>((acc, [key, value]) => {
        if (key === 'qnaList' || key === 'media' || key === 'perks') return acc

        if (modifiedFields.has(key as keyof Campaign)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          acc[key as keyof Campaign] = value
        }
        return acc
      }, {})

      if (Object.keys(fieldsToUpdate).length > 0) {
        await updateCampaign({ ...fieldsToUpdate, campaignId: campaign.campaignId })
      }

      if (modifiedFields.has('qnaList')) {
        const filteredQnaList = campaign.qnaList?.filter((qna) => qna.question && qna.answer) || []
        if (filteredQnaList.length > 0) {
          await updateCampaignQna(campaign.campaignId, filteredQnaList)
        }
      }

      campaign.perks?.forEach(async (perk, index) => {
        if (!perk.perkId && perk.imageFile) {
          if (!isValidImageFormat(perk.imageFile) || !isValidImageSize(perk.imageFile)) {
            throw new Error(INVALID_IMAGE_ERROR)
          } else {
            const { perkImagePresignedUrl, perkImage, perkId } = await addPerk(campaign.campaignId, {
              ...perk,
              imageFile: undefined,
            })

            if (perkImagePresignedUrl) {
              await uploadImageToS3(perkImagePresignedUrl, perk.imageFile)
            }

            setState((prev) => ({
              ...prev,
              campaign: {
                ...prev.campaign,
                perks: prev.campaign.perks?.map((p, i) => (i === index ? { ...p, perkId, perkImage } : p)),
              },
            }))
          }
        }
      })

      setModifiedFields(new Set())

      if (isLastStep) {
        push('/user/campaigns/my')
      } else {
        nextStep()
      }
    } catch (error) {
      throw new Error(`Failed to save campaign: ${error}`)
    } finally {
      setState((prev) => ({ ...prev, loading: false }))
    }
  }, [campaign, isLastStep, modifiedFields, nextStep, push])

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>, launch: boolean) => {
      e.preventDefault()
      clearErrors()
      setState((prev) => ({ ...prev, loading: true }))

      try {
        if (launch) {
          validateRequiredFields(campaign)
        }

        await saveCampaign()

        if (launch && campaign.campaignStatusId === 1) {
          await updateCampaignStatus(campaign.campaignId, 2)
        }
      } catch (error) {
        if (Object.keys(errors).length === 0) {
          setFieldError('general', error instanceof Error ? error.message : 'An unexpected error occurred')
        }
      } finally {
        setState((prev) => ({ ...prev, loading: false }))
      }
    },
    [campaign, clearErrors, errors, saveCampaign, setFieldError, validateRequiredFields]
  )

  const removeImage = useCallback(
    async (index: number) => {
      if (!campaign?.media) return

      setState((prev) => ({ ...prev, loading: true }))

      try {
        await deleteCampaignImage({
          campaignId: campaign.campaignId,
          imageId: campaign.media[index].imageId,
        })
        setState((prev) => ({
          ...prev,
          campaign: {
            ...prev.campaign,
            media: prev.campaign.media?.filter((_, i) => i !== index),
          },
        }))
      } catch (error) {
        throw error
      } finally {
        setState((prev) => ({ ...prev, loading: false }))
      }
    },
    [campaign]
  )

  const uploadCoverImage = useCallback(
    async (file: File) => {
      if (!campaign.campaignId) return
      clearErrors('coverPic')

      if (!isValidImageFormat(file) || !isValidImageSize(file)) {
        setFieldError('coverPic', INVALID_IMAGE_ERROR)
        return
      }

      setState((prev) => ({ ...prev, loading: true }))

      try {
        const { picPresignedUrl } = await updateCampaign({
          addUpdPic: campaign.coverPic ? 2 : 1,
          campaignId: campaign.campaignId,
          coverPicType: file.type,
          coverPic: file.name,
        })

        if (!picPresignedUrl) throw new Error('No presigned URL found')

        const { url } = await uploadImageToS3(picPresignedUrl, file)

        setState((prev) => ({
          ...prev,
          campaign: {
            ...prev.campaign,
            coverPic: url,
          },
        }))
      } catch (error) {
        setFieldError('coverPic', error instanceof Error ? error.message : 'Failed to upload cover image')
      } finally {
        setState((prev) => ({ ...prev, loading: false }))
      }
    },
    [campaign.campaignId, campaign.coverPic, clearErrors, setFieldError]
  )

  const uploadImages = useCallback(
    async (files: File[]) => {
      if (!campaign.campaignId) return

      if (files.some((file) => !isValidImageFormat(file) || !isValidImageSize(file))) {
        setFieldError('media', INVALID_IMAGE_ERROR)
        return
      }

      setState((prev) => ({ ...prev, loading: true }))
      const uploadedImages: MediaItem[] = []

      try {
        const imageList = files.map((file) => ({
          imageType: '0' as const,
          imageUrl: file.name,
          fileType: file.type,
        }))

        const response = await updateCampaignMedia({
          imageList,
          campaignId: campaign.campaignId,
        })

        await Promise.all(
          files.map(async (file, index) => {
            try {
              await uploadImageToS3(response[index].presignedUrl, file)
              uploadedImages.push({
                imageId: response[index].imageId,
                imageType: 0,
                imageUrl: response[index].imageUrl,
              })
            } catch (error) {
              await removeImage(index)
              throw error
            }
          })
        )

        setState((prev) => ({
          ...prev,
          campaign: {
            ...prev.campaign,
            media: [...(prev.campaign.media || []), ...uploadedImages],
          },
        }))
      } finally {
        setState((prev) => ({ ...prev, loading: false }))
      }
    },
    [campaign.campaignId, removeImage, setFieldError]
  )

  const uploadVideo = useCallback(
    async (url: string) => {
      if (!campaign.campaignId) return

      if (!isValidVideoUrl(url)) {
        throw new Error('Invalid video URL: only YouTube and Vimeo links are supported')
      }

      setState((prev) => ({ ...prev, loading: true }))

      try {
        const response = await updateCampaignMedia({
          imageList: [
            {
              imageType: '1' as const,
              imageUrl: url,
              fileType: 'video',
            },
          ],
          campaignId: campaign.campaignId,
        })

        setState((prev) => ({
          ...prev,
          campaign: {
            ...prev.campaign,
            media: [...(prev.campaign.media || []), response[0]],
          },
        }))
      } catch (error) {
        throw error
      } finally {
        setState((prev) => ({ ...prev, loading: false }))
      }
    },
    [campaign]
  )

  const api = useMemo(
    () => ({
      state,
      errors,
      clearErrors,
      setFieldError,
      validateRequiredFields,
      handleSubmit,
      handleChange,
      uploadImages,
      uploadCoverImage,
      removeImage,
      uploadVideo,
      handleQnaChange,
      nextStep,
      prevStep,
      goToStep,
      handlePerkChange,
    }),
    [
      state,
      errors,
      clearErrors,
      setFieldError,
      validateRequiredFields,
      handleSubmit,
      handleChange,
      uploadImages,
      uploadCoverImage,
      removeImage,
      uploadVideo,
      handleQnaChange,
      nextStep,
      prevStep,
      goToStep,
      handlePerkChange,
    ]
  )

  return <CampaignContext.Provider value={api}>{children}</CampaignContext.Provider>
}

export function useCampaign() {
  const context = useContext(CampaignContext)
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider')
  }
  return context
}
