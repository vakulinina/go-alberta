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
    invest: 'CAD 45',
    campaign: 'Once_In_A_Summere 10W Graphic Novel',
    date: 'Mon Dec 15 2024 09:13:28',
    perks: '-',
    status: 'Pending',
  },
]
