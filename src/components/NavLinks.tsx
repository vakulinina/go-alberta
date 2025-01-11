'use client'

import Link from 'next/link'

import React from 'react'

const links = [{ href: '/campaigns', label: 'Explore' }]

export const NavLinks = () => {
  return (
    <>
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className="whitespace-nowrap text-[20px]">
          {label}
        </Link>
      ))}
    </>
  )
}
