'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CampaignIcon } from '../Icons/CampaignIcon'
import { ContributionIcon } from '../Icons/ContributionIcon'
import { GearIcon } from '../Icons/GearIcon'

interface MenuItem {
  id: string
  label: string
  icon?: React.ReactNode
  href: string
  subItems?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: <CampaignIcon className="h-4 w-4" />,
    href: '/campaigns',
    subItems: [
      { id: 'new', label: 'New Campaign', href: '/campaigns/new' },
      { id: 'my', label: 'My Campaigns', href: '/campaigns/my' },
      { id: 'saved', label: 'Saved Campaigns', href: '/campaigns/saved' },
    ],
  },
  {
    id: 'contributions',
    label: 'Contributions',
    icon: <ContributionIcon className="h-4 w-4" />,
    href: '/contributions',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <GearIcon className="h-5.3 w-5.3 -ml-1" />,
    href: '/settings',
    subItems: [
      { id: 'profile', label: 'Profile Information', href: '/settings/profile' },
      { id: 'password', label: 'Change Password', href: '/settings/password' },
    ],
  },
]

export default function SideBar() {
  const pathname = usePathname()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('expandedMenus')
    if (saved) {
      setExpandedMenus(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (expandedMenus.length > 0) {
      localStorage.setItem('expandedMenus', JSON.stringify(expandedMenus))
    }
  }, [expandedMenus])

  useEffect(() => {
    const currentMainMenu = menuItems.find((item) => item.subItems?.some((subItem) => subItem.href === pathname))
    if (currentMainMenu && !expandedMenus.includes(currentMainMenu.id)) {
      setExpandedMenus((prev) => [...prev, currentMainMenu.id])
    }
  }, [pathname, expandedMenus])

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => (prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]))
  }

  return (
    <nav className="w-full bg-white">
      <div className="hidden min-h-screen border-gray-200 md:block">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id} className="w-full">
              <button
                onClick={() => item.subItems && toggleMenu(item.id)}
                className={`flex w-full items-center gap-3 px-6 py-2 text-left transition-colors ${pathname === item.href ? 'bg-gray-300 text-gray-900' : 'text-gray-600 hover:bg-gray-200'} `}
              >
                {item.icon}
                {item.label}
              </button>

              {item.subItems && expandedMenus.includes(item.id) && (
                <ul className="ml-4 mt-2 w-full space-y-2">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.id} className="-mx-4 w-full">
                      <Link href={subItem.href} className="block w-full">
                        <span
                          className={`block w-full whitespace-nowrap px-6 py-2 transition-colors ${pathname === subItem.href ? 'bg-gray-300 text-gray-900' : 'text-gray-600 hover:bg-gray-200'} `}
                        >
                          <span className="inline-block pl-8">{subItem.label}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full border-b border-t border-gray-300 md:hidden">
        <ul className="flex w-full">
          {menuItems.map((item) => (
            <li key={item.id} className="group relative w-1/3">
              <button
                className={`w-full whitespace-nowrap px-6 py-2 text-center transition-colors ${
                  pathname === item.href ? 'bg-gray-300 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>

              {item.subItems && (
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-1 group-hover:visible">
                  <ul className="w-30 border border-gray-300 bg-white shadow-lg">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.id}>
                        <Link href={subItem.href}>
                          <span
                            className={`block cursor-pointer px-4 py-2 text-center text-sm transition-colors hover:bg-gray-100 ${
                              pathname === subItem.href ? 'bg-gray-300 text-gray-900' : 'text-gray-600'
                            }`}
                          >
                            {subItem.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
