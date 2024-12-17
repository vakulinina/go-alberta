export const MOCK_CAMPAIGNS = new Array(9).fill({}).map((_, index) => ({
  id: (index + 1).toString(),
  title: 'Campaign Title',
  description: 'Campaign Description',
  raised: 5220,
  total: 7500,
  imageUrl: '/mock-camp-main.webp',
  invests: 75,
  days: 15,
}))
