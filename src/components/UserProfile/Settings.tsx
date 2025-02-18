'use client'
import { Button } from '@/components/Button'
import { PasswordInput } from '@/components/Inputs/PasswordInput'
import { UserIcon } from '@/components/Icons/UserIcon'
import { useState } from 'react'
import { CameraIcon } from '../Icons/CameraIcon'
import { Input } from '../Inputs/Input'
import { userApi } from '@/api/userApi'
import { useAuth } from '@/context/AuthContext'
import { Toast } from '@/components/Toast'

const FIRST_NAME = 'First Name'
const LAST_NAME = 'Last Name'

export default function Settings() {
  const { user, setUser } = useAuth()
  const userId = user?.userId

  const [displayFirstName, setDisplayFirstName] = useState(user?.name || FIRST_NAME)
  const [displayLastName, setDisplayLastName] = useState(user?.surname || LAST_NAME)

  const [firstName, setFirstName] = useState(user?.name || FIRST_NAME)
  const [lastName, setLastName] = useState(user?.surname || LAST_NAME)
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastVariant, setToastVariant] = useState<'success' | 'error' | 'info'>('info')

  const handleSave = async () => {
    if (!userId) return

    setLoading(true)
    setToastMessage(null)

    try {
      await userApi.patchUserName(firstName, lastName, userId, phoneNumber)

      setUser({
        ...user!,
        name: firstName,
        surname: lastName,
        phone: phoneNumber,
      })

      setDisplayFirstName(firstName)
      setDisplayLastName(lastName)

      setToastMessage('User data updated successfully!')
      setToastVariant('success')
    } catch (err) {
      setToastMessage((err as Error).message || 'Failed to update user data')
      setToastVariant('error')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFirstName(user?.name || FIRST_NAME)
    setLastName(user?.surname || LAST_NAME)
    setPhoneNumber(user?.phone || '')
    setCurrentPassword('')
    setNewPassword('')
    setRepeatNewPassword('')
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4 pl-8">
        <div className="relative h-16 w-16">
          <UserIcon className="h-full w-full" />
          <div className="absolute bottom-0 right-0 rounded-full bg-white">
            <CameraIcon className="-m-[2px] h-5 w-5" />
          </div>
        </div>
        <h1 className="text-xl font-bold">{`${displayFirstName} ${displayLastName}`}</h1>
      </div>

      <form className="flex flex-col gap-6 px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 md:px-0">
          <div className="flex max-w-[400px] flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label>First Name</label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
            </div>
            <div className="flex flex-col gap-2">
              <label>Last Name</label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
            </div>
            <div className="flex flex-col gap-2">
              <label>Phone Number</label>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 xxx xxx xxxx"
              />
            </div>
          </div>

          <div className="flex max-w-[400px] flex-col gap-4 md:pl-0">
            <div className="flex flex-col gap-2">
              <label>Current Password</label>
              <PasswordInput value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <label>New Password</label>
              <PasswordInput value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <label>Repeat New Password</label>
              <PasswordInput value={repeatNewPassword} onChange={(e) => setRepeatNewPassword(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button className="w-[180px] md:w-[200px]" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="w-[180px] md:w-[200px]" type="button" onClick={handleSave} loading={loading}>
            Save
          </Button>
        </div>
      </form>

      {toastMessage && <Toast message={toastMessage} variant={toastVariant} onClose={() => setToastMessage(null)} />}
    </div>
  )
}
