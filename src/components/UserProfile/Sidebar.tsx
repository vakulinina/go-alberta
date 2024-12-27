'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
    href: '/contributions',
  },
  {
    id: 'settings',
    label: 'Settings',
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

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => (prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]))
  }
  return (
    <nav className="w-full bg-white md:w-1/6">
      <div className="hidden min-h-screen border-gray-200 p-4 md:block">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id} className="w-full">
              <button
                onClick={() => item.subItems && toggleMenu(item.id)}
                className={`w-full rounded-lg p-2 text-left transition-colors ${pathname === item.href ? 'bg-gray-300 text-gray-900' : 'text-gray-600 hover:bg-gray-200'} `}
              >
                {item.label}
              </button>

              {item.subItems && expandedMenus.includes(item.id) && (
                <ul className="ml-4 mt-2 space-y-2">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.id} className="w-full">
                      <Link href={subItem.href} className="block w-full">
                        <span
                          className={`block w-full whitespace-nowrap rounded-lg p-2 transition-colors ${pathname === subItem.href ? 'bg-gray-300 text-gray-900' : 'text-gray-600 hover:bg-gray-200'} `}
                        >
                          {subItem.label}
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

      <div className="w-full border-b border-t border-gray-200 p-2 md:hidden">
        <ul className="flex justify-around">
          {menuItems.map((item) => (
            <li key={item.id} className="group relative">
              <button
                className={`whitespace-nowrap rounded-lg px-3 py-2 transition-colors ${
                  pathname === item.href ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>

              {item.subItems && (
                <div className="invisible absolute left-0 top-full pt-1 group-hover:visible">
                  <ul className="w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.id}>
                        <Link href={subItem.href}>
                          <span
                            className={`block cursor-pointer px-4 py-2 transition-colors hover:bg-gray-100 ${
                              pathname === subItem.href ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
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
