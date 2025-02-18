export type CampaignStatus = 1 | 2 | 3 | 4 | 5 | 6

export interface CampaignReviewType {
  campaignId: string
  title: string
  ownerName: string
  ownerSurname: string
  submittedDate: string
  campaignStatusId: CampaignStatus
  adminMessage?: string
  lastUpdated?: string
  startDate?: string
}
