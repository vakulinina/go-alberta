'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
    href: '/user/campaigns',
    subItems: [
      { id: 'new', label: 'New Campaign', href: '/user/campaigns/new' },
      { id: 'my', label: 'My Campaigns', href: '/user/campaigns/my' },
      { id: 'saved', label: 'Saved Campaigns', href: '/user/campaigns/saved' },
    ],
  },
  {
    id: 'contributions',
    label: 'Contributions',
    icon: <ContributionIcon className="h-4 w-4" />,
    href: '/user/contributions',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <GearIcon className="h-5.3 w-5.3 -ml-1" />,
    href: '/user/settings',
  },
]

export default function SideBar() {
  const router = useRouter()
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

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => (prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]))
  }

  const handleMainMenuClick = (item: MenuItem) => {
    toggleMenu(item.id)
    if (item.subItems && !expandedMenus.includes(item.id)) {
      router.push(item.href)
    }
  }

  return (
    <nav className="w-full bg-white">
      <div className="hidden min-h-screen border-gray-500 md:block">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id} className="w-full">
              {item.subItems ? (
                <button
                  onClick={() => handleMainMenuClick(item)}
                  className={`flex w-full items-center gap-3 px-6 py-2 text-left transition-colors hover:underline ${pathname === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600'} `}
                >
                  {item.icon}
                  {item.label}
                </button>
              ) : (
                <Link href={item.href} className="block w-full">
                  <span
                    className={`flex w-full items-center gap-3 px-6 py-2 text-left transition-colors hover:underline ${
                      pathname === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </span>
                </Link>
              )}

              {item.subItems && expandedMenus.includes(item.id) && (
                <ul className="ml-4 mt-2 w-full space-y-2">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.id} className="-mx-4 w-full">
                      <Link href={subItem.href} className="block w-full">
                        <span
                          className={`block w-full cursor-pointer whitespace-nowrap px-6 py-2 transition-colors ${pathname === subItem.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600'} `}
                        >
                          <span className="inline-block pl-8 hover:underline">{subItem.label}</span>
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

      <div className="border-gray-150 w-full border-b border-t md:hidden">
        <ul className="flex w-full">
          {menuItems.map((item) => (
            <li key={item.id} className="group relative w-1/3">
              {item.subItems ? (
                <button
                  onClick={() => handleMainMenuClick(item)}
                  className={`w-full whitespace-nowrap px-6 py-2 text-center transition-colors hover:underline ${
                    pathname === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <Link href={item.href} className="block w-full">
                  <span
                    className={`block w-full whitespace-nowrap px-6 py-2 text-center transition-colors hover:underline ${
                      pathname === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              )}

              {item.subItems && (
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-1 group-hover:visible">
                  <ul className="w-30 border border-gray-300 bg-white shadow-lg">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.id}>
                        <Link href={subItem.href}>
                          <span
                            className={`block cursor-pointer px-4 py-2 text-center text-sm transition-colors hover:underline ${
                              pathname === subItem.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
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
