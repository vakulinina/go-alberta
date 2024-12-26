import { Campaign } from '@/types/campaign'

export const MOCK_CAMPAIGN: Campaign = {
  id: '1',
  title: 'Campaign Title',
  description:
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quod aperiam molestiae temporibus quiabeatae aliquid, asperiores fugiat odit dicta obcaecati atque officiis ipsa delectus? Magni reiciendis odit deserunt ipsa?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro ad magni culpa sapiente iustoexcepturi, laboriosam autem molestiae veritatis. Quaerat, fugiat quae ratione nihil sequi dignissimos nulla atnostrum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit eaque excepturi nam quos nobis, delenitiasperiores. Corrupti placeat maiores ad beatae, nam dolor tempora ab veritatis. Inventore porro quia ad?lorem',
  raised: 5220,
  total: 7500,
  imageUrl: '/mock-camp-main.webp',
  invests: 75,
  days: 15,
  media: [
    { type: 'image', src: 'https://via.placeholder.com/800x450', alt: 'Sample Image 1' },
    { type: 'image', src: 'https://via.placeholder.com/800x450', alt: 'Sample Image 2' },
    { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', platform: 'youtube' },
    { type: 'video', src: 'https://player.vimeo.com/video/459221891', platform: 'vimeo' },
    { type: 'image', src: 'https://via.placeholder.com/800x450', alt: 'Sample Image 3' },
  ],
  perks: [
    {
      title: 'Perk 1',
      description: 'Perk Description',
      price: 100,
      shippingDate: '2025-02-14',
      imageUrl: 'https://via.placeholder.com/220x220',
    },
    {
      title: 'Perk 2',
      description: 'Perk Description',
      price: 200,
      shippingDate: '2025-02-14',
      imageUrl: 'https://via.placeholder.com/220x220',
    },
    {
      title: 'Perk 3',
      description: 'Perk Description',
      price: 300,
      shippingDate: '2025-02-14',
      imageUrl: 'https://via.placeholder.com/220x220',
    },
    {
      title: 'Perk 4',
      description: 'Perk Description',
      price: 400,
      shippingDate: '2025-02-14',
      imageUrl: 'https://via.placeholder.com/220x220',
    },
    {
      title: 'Perk 5',
      description: 'Perk Description',
      price: 500,
      shippingDate: '2025-02-14',
      imageUrl: 'https://via.placeholder.com/220x220',
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
        imageUrl: 'https://via.placeholder.com/40x40',
      },
      content:
        'Comment 1. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quod aperiam molestiae temporibus quiabeatae aliquid, asperiores',
      date: '2025-02-14',
    },
    {
      id: '2',
      user: {
        name: 'Jane Doe',
        imageUrl: '',
      },
      content:
        'Comment 2. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quod aperiam molestiae temporibus quiabeatae aliquid, asperiores que officiis ipsa delectus? Magni reiciendis odit deserunt ipsa?Lorem ipsum dolor sit, amet consec',
      date: '2025-02-14',
    },
    {
      id: '3',
      user: {
        name: 'John Doe',
        imageUrl: 'https://via.placeholder.com/40x40',
      },
      content:
        'Comment 3. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quod aperiam molestiae temporibus quiabeatae aliquid, asperiores',
      date: '2025-02-14',
    },
  ],
}

export const MOCK_CAMPAIGNS: Campaign[] = new Array(9).fill(MOCK_CAMPAIGN).map((item, index) => ({
  ...item,
  id: (index + 1).toString(),
}))
