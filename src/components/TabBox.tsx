'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const TabBox = ({ tabs }: { tabs: { name: string; href: string }[] }) => {
  const pathname = usePathname()

  return (
    <div className="mb-4">
      <div className="flex space-x-[70px]">
        {tabs.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            className={`text-[20px] ${
              pathname === href ? 'border-b-[3px] border-[#80CD57]' : 'hover:border-b-[3px] hover:border-[#C8C8C8]'
            }`}
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  )
}
