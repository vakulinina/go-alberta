'use client'
import { usePathname } from 'next/navigation'
import { ChevronRightIcon } from '../Icons/ChevronRightIcon'
import { IndexIcon } from '../Icons/IndexIcon'

type NavItem = {
  id: string
  label: string
  href: string
}

const NavItems: NavItem[] = [
  {
    id: 'user',
    label: 'User Profile',
    href: '/user',
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    href: '/user/campaigns',
  },
  {
    id: 'new-campaigns',
    label: 'New Campaign',
    href: '/user/campaigns/new',
  },
  {
    id: 'my-campaigns',
    label: 'My Campaigns',
    href: '/user/campaigns/my',
  },
  {
    id: 'saved-campaigns',
    label: 'Saved Campaigns',
    href: '/user/campaigns/saved',
  },
  {
    id: 'contributions',
    label: 'Contributions',
    href: '/user/contributions',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/user/settings',
  },
]

export default function NavBar() {
  const pathname = usePathname()
  const currentNavItem = NavItems.filter((item) => pathname?.startsWith(item.href)).sort(
    (a, b) => b.href.length - a.href.length
  )[0]

  return (
    <nav className="flex h-14 w-full items-center justify-between bg-white px-4">
      <div className="flex items-center gap-1">
        <IndexIcon className="h-4 w-4" />
        <span className="text-neutral-500">Go Alberta</span>
        <ChevronRightIcon className="h-4 w-4" />
        {currentNavItem && <span key={currentNavItem.id}>{currentNavItem.label}</span>}
      </div>
    </nav>
  )
}
