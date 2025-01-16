'use client'
import { Button } from '@/components/Button'
import { useRouter } from 'next/navigation'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter()

  return (
    <div className="px-[100px] py-[60px]">
      <h2 className="mb-[30px] text-center">
        {
          'You can try again or return to the main page using the buttons below. If the issue continues, please contact our support team.'
        }
      </h2>
      <div className="flex justify-center gap-5">
        <Button variant="secondary" onClick={() => reset()}>
          Try again
        </Button>
        <Button variant="secondary" onClick={() => router.push('/')}>
          Go to main
        </Button>
      </div>
    </div>
  )
}
