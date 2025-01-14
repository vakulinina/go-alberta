import { MOCK_CAMPAIGNS } from '@/constants/campaigns-mock'
import Image from 'next/image'
import avatar from '../../../../images/avatar.svg'
import { Button } from '@/components/Button'

const DiscussionsTab = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id

  // TODO: replace with actual data fetching
  const { comments } = MOCK_CAMPAIGNS.find((campaign) => campaign.id === Number(id)) || { comments: [] }

  return (
    <>
      {comments?.map(({ id, user, content, date }) => (
        <div key={id} className="mb-[40px] flex flex-col gap-[16px]">
          <div className="mb-[16px] flex items-center" key={id}>
            <Image
              className="mr-[10px] shrink-0 rounded-full"
              src={user.imageUrl || avatar}
              alt={user.name}
              width={40}
              height={40}
            />
            <p className="text-[20px] font-bold">{user.name}</p>
          </div>

          <p className="text-[16px]">{content}</p>
          <p className="text-[14px] text-[#9B9B9B]">{date}</p>
        </div>
      ))}

      <div className="mb-[40px] flex flex-col gap-[16px] rounded-lg border border-[#80CD57] p-[20px] shadow-md">
        <div className="flex items-center">
          {/* TODO: replace with proper User Avatar component when implemented */}
          <Image className="mr-[8px] shrink-0 rounded-full" src={avatar} alt="" width={40} height={40} />
          <p className="text-[20px]">User Name</p>
        </div>
        <textarea
          className="border-[rgba(0, 0, 0, 0.40)] w-full rounded-none border-b pb-[16px] text-[14px]"
          placeholder="Write a comment..."
        />
        <Button className="self-end">Comment</Button>
      </div>
    </>
  )
}

export default DiscussionsTab
