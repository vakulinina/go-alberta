import { Campaign } from '@/types/campaign'

export const MOCK_CAMPAIGN: Campaign = {
  campaignId: 1,
  userId: 1,
  campaignStatusId: 0,
  title: 'COOLSMILE: Portable Air Cooler for Any Space',
  campaignDesc:
    'Lorem ipsum, dolor sit amet consect quod aperiam molestiae temporibus quiabeatae aliquid, asperiores fugiat odit dicta obcaecati atque officiis ipsa delectus? Magni reiciendis odit deserunt ipsa?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ad magni culpa sapiente iustoexcepturi, laboriosam autem molestiae veritatis. Quaerat, fugiat quae ratione nihil sequi dignissimos nulla atnostrum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eaque excepturi nam quos nobis, delenitiasperiores. Corrupti placeat maiores ad beatae, nam dolor tempora ab veritatis. Inventore porro quia ad?lorem',
  amount: 5220,
  fundingTarget: 7500,
  coverPic: '/mock-camp-main.webp',
  invests: 75,
  days: 15,
  startDate: '2024-12-22T00:00:00.000Z',
  media: [
    { imageType: 0, imageUrl: 'https://placehold.co/800x450/png', imageId: 1 },
    { imageType: 0, imageUrl: 'https://placehold.co/800x450/png', imageId: 2 },
    { imageType: 1, imageUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', imageId: 3 },
    { imageType: 1, imageUrl: 'https://player.vimeo.com/video/459221891', imageId: 4 },
    { imageType: 0, imageUrl: 'https://placehold.co/800x450/png', imageId: 5 },
  ],
  perks: [
    {
      perkId: 1,
      perkText: 'Perk 1',
      perkAmount: 100,
      perkImage: 'https://placehold.co/220x220/png',
    },
    {
      perkId: 2,
      perkText: 'Perk 2',
      perkAmount: 200,
      perkImage: 'https://placehold.co/220x220/png',
    },
    {
      perkId: 3,
      perkText: 'Perk 3',
      perkAmount: 300,
      perkImage: 'https://placehold.co/220x220/png',
    },
    {
      perkId: 4,
      perkText: 'Perk 4',
      perkAmount: 400,
      perkImage: 'https://placehold.co/220x220/png',
    },
    {
      perkId: 5,
      perkText: 'Perk 5',
      perkAmount: 500,
      perkImage: 'https://placehold.co/220x220/png',
    },
  ],
  qnaList: [
    {
      question: 'Question 1',
      answer:
        'Answer 1. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quod aperiam molestiae temporibus quiabeatae aliquid, asperiores fugiat odit dicta obcaecati atque officiis ipsa delectus? Magni reiciendis odit deserunt ipsa?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ad magni culpa sapiente iustoexcepturi, laboriosam autem molestiae veritatis. Quaerat, fugiat quae ratione nihil sequi dignissimos nulla atnostrum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eaque excepturi nam quos nobis, delenitiasperiores. Corrupti placeat maiores ad beatae, nam dolor tempora ab veritatis. Inventore porro quia',
    },
    {
      question: 'Question 2',
      answer:
        'Answer 2. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quod aperiam molestiae temporibus quiabeatae aliquid, asperiores fugiat odit dicta obcaecati atque officiis ipsa delectus? Magni reiciendis odit deserunt ipsa?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ad magni culpa sapiente iustoexcepturi, laboriosam autem molestiae veritatis. Quaerat, fugiat quae ratione nihil sequi dignissimos nulla atnostrum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eaque excepturi nam quos nobis, delenitiasperiores. Corrupti placeat maiores ad beatae, nam dolor tempora ab veritatis. Inventore porro quia',
    },
    {
      question: 'Question 3',
      answer:
        'Answer 3. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quod aperiam molestiae temporibus quiabeatae aliquid, asperiores fugiat odit dicta obcaecati atque officiis ipsa delectus? Magni reiciendis odit deserunt ipsa?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ad magni culpa sapiente iustoexcepturi, laboriosam autem molestiae veritatis. Quaerat, fugiat quae ratione nihil sequi dignissimos nulla atnostrum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eaque excepturi nam quos nobis, delenitiasperiores. Corrupti placeat maiores ad beatae, nam dolor tempora ab veritatis. Inventore porro quia',
    },
  ],
  comments: [
    {
      id: '1',
      user: {
        name: 'John Doe',
        imageUrl: 'https://placehold.co/40x40/png',
      },
      content:
        'Comment 1. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quod aperiam molestiae temporibus quiabeatae aliquid, asperiores',
      date: '2024-12-22T00:00:00.000Z',
    },
    {
      id: '2',
      user: {
        name: 'Jane Doe',
        imageUrl: '',
      },
      content:
        'Comment 2. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quod aperiam molestiae temporibus quiabeatae aliquid, asperiores que officiis ipsa delectus? Magni reiciendis odit deserunt ipsa?Lorem ipsum dolor sit, amet consec',
      date: '2024-12-22T00:00:00.000Z',
    },
    {
      id: '3',
      user: {
        name: 'John Doe',
        imageUrl: 'https://placehold.co/40x40/png',
      },
      content:
        'Comment 3. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quod aperiam molestiae temporibus quiabeatae aliquid, asperiores',
      date: '2024-12-22T00:00:00.000Z',
    },
  ],
}

export const MOCK_CAMPAIGNS: Campaign[] = new Array(9).fill(MOCK_CAMPAIGN).map((item, index) => ({
  ...item,
  title: `Campaign Title ${index + 1}${index === 1 ? ' very long long long long long long long long' : ''}`,
  id: index + 1,
  userId: index + 1,
}))
