'use client'

import { memo, useState } from 'react'
import { Toast } from '../Toast'
import { Button, ButtonProps } from '../Button'

const CampaignShareButtonComponent = ({
  campaignId,
  onShare,
  ButtonComponent = Button,
  buttonProps = {},
}: {
  campaignId: number
  onShare?: () => void
  ButtonComponent?: React.ComponentType<ButtonProps>
  buttonProps?: ButtonProps
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleShare = async () => {
    const campaignUrl = `${window.location.origin}/campaigns/${campaignId}`

    try {
      await navigator.clipboard.writeText(campaignUrl)
      setToastMessage(`Campaign link copied to clipboard`)
      onShare?.()
    } catch (error) {
      throw new Error(`Failed to copy link: ${error}`)
    }
  }

  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}
      <ButtonComponent {...buttonProps} onClick={handleShare} />
    </>
  )
}

export const CampaignShareButton = memo(CampaignShareButtonComponent)
