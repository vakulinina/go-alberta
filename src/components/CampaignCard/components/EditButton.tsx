'use client'

import React from 'react'
import { EditIcon } from '@/components/Icons/EditIcon'
import { useRouter } from 'next/navigation'

const EditButtonComponent = ({ href }: { href: string }) => {
  const { push } = useRouter()

  return (
    <button
      type="button"
      className="group/edit absolute left-0 top-0 p-[10px]"
      onClick={(e) => {
        e.preventDefault()
        push(href)
      }}
    >
      <EditIcon className="group-hover/edit:stroke-[#51236DD9]" />
    </button>
  )
}

export const EditButton = React.memo(EditButtonComponent)
