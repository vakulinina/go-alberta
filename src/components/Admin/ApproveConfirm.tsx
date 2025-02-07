import { Button } from '@/components/Button'

interface ApproveConfirmProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const ApproveConfirm: React.FC<ApproveConfirmProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold">Confirm Approve</h3>
        <p className="mb-6">Are you sure you want to approve this review?</p>
        <div className="flex justify-end space-x-4">
          <Button
            variant="secondary"
            onClick={() => {
              onClose()
            }}
            className="!h-[40px] !text-base"
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm} className="!h-[40px] !text-base">
            Approved
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ApproveConfirm
