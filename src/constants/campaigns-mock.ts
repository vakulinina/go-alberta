import { Campaign } from '@/types/campaign'

export const MOCK_CAMPAIGN: Campaign = {
  campaignId: 1,
  userId: 1,
  campaign_status_id: 0,
  title: 'COOLSMILE: Portable Air Cooler for Any Space',
  description:
    'Lorem ipsum, dolor sit amet consect quod aperiam molestiae temporibus quiabeatae aliquid, asperiores fugiat odit dicta obcaecati atque officiis ipsa delectus? Magni reiciendis odit deserunt ipsa?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ad magni culpa sapiente iustoexcepturi, laboriosam autem molestiae veritatis. Quaerat, fugiat quae ratione nihil sequi dignissimos nulla atnostrum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eaque excepturi nam quos nobis, delenitiasperiores. Corrupti placeat maiores ad beatae, nam dolor tempora ab veritatis. Inventore porro quia ad?lorem',
  raised: 5220,
  target: 7500,
  coverPic: '/mock-camp-main.webp',
  invests: 75,
  days: 15,
  startDate: '2024-12-22T00:00:00.000Z',
  media: [
    { type: 'image', src: 'https://placehold.co/800x450/png', alt: 'Sample Image 1' },
    { type: 'image', src: 'https://placehold.co/800x450/png', alt: 'Sample Image 2' },
    { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', platform: 'youtube' },
    { type: 'video', src: 'https://player.vimeo.com/video/459221891', platform: 'vimeo' },
    { type: 'image', src: 'https://placehold.co/800x450/png', alt: 'Sample Image 3' },
  ],
  perks: [
    {
      title: 'Perk 1',
      description: 'Perk 1 Description',
      price: 100,
      shippingDate: '2024-12-22T00:00:00.000Z',
      imageUrl: 'https://placehold.co/220x220/png',
    },
    {
      title: 'Perk 2',
      description: 'Perk 2 Description',
      price: 200,
      shippingDate: '2024-12-22T00:00:00.000Z',
      imageUrl: 'https://placehold.co/220x220/png',
    },
    {
      title: 'Perk 3',
      description: 'Perk 3 Description',
      price: 300,
      shippingDate: '2024-12-22T00:00:00.000Z',
      imageUrl: 'https://placehold.co/220x220/png',
    },
    {
      title: 'Perk 4',
      description: 'Perk 4 Description',
      price: 400,
      shippingDate: '2024-12-22T00:00:00.000Z',
      imageUrl: 'https://placehold.co/220x220/png',
    },
    {
      title: 'Perk 5',
      description: 'Perk 5 Description',
      price: 500,
      shippingDate: '2024-12-22T00:00:00.000Z',
      imageUrl: 'https://placehold.co/220x220/png',
    },
  ],
  qna: [
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
