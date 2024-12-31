export interface Contribution {
  invest: string
  campaign: string
  date: string
  perks: string
  status: 'Accepted' | 'Pending'
}

export const mockContributions: Contribution[] = [
  {
    invest: 'CAD 1000',
    campaign: 'GENKI-Moonbase 240W Desktop Supercharger',
    date: 'Sat Nov 09 2024 02:44:37',
    perks: '-',
    status: 'Accepted',
  },
  {
    invest: 'CAD 1000',
    campaign: 'GENKI-Moonbase 240W Desktop Supercharger',
    date: 'Sat Nov 09 2024 02:44:37',
    perks: '-',
    status: 'Pending',
  },
]
