'use client'
import { Button } from '@/components/Button'
import { PasswordInput } from '@/components/PasswordInput'
import { InputBox } from '@/components/InputBox'
import { UserIcon } from '@/components/Icons/UserIcon'
import { useState } from 'react'
import { CameraIcon } from '../Icons/CameraIcon'

export default function Settings() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4 pl-8">
        <div className="relative h-16 w-16">
          <UserIcon className="h-full w-full" />
          <div className="absolute bottom-0 right-0 rounded-full bg-white">
            <CameraIcon className="-m-[2px] h-5 w-5" />
          </div>
        </div>
        <h1 className="text-xl font-bold"># Mahnaz Booshehrian</h1>
      </div>

      <form className="flex flex-col gap-6 px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 md:px-0">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label>First Name</label>
              <InputBox value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Mahnaz" />
            </div>
            <div className="flex flex-col gap-2">
              <label>Last Name</label>
              <InputBox value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Booshehrian" />
            </div>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <InputBox
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m.b@gmail.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Phone Number</label>
              <InputBox
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1xxx xxx xxxx"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:pl-0">
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
          <Button className="w-[180px] md:w-[200px]">Cancel</Button>
          <Button className="w-[180px] md:w-[200px]">Save</Button>
        </div>
      </form>
    </div>
  )
}
