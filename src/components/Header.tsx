import Link from 'next/link'
import { NavLinks } from './NavLinks'

export const Header = () => {
  return (
    <header className="box-border flex h-[84px] items-center justify-between border-b border-[#E1E1E1] px-[9px]">
      <Link href="/" className="mr-[56px] text-[32px] uppercase">
        Go Alberta
      </Link>
      <div className="flex gap-[50px]">
        <NavLinks />
      </div>
      <div className="ml-auto flex gap-[50px] text-[20px]">
        <span>Start a Campaign</span>
        <span>Log in / Sign up</span>
      </div>
    </header>
  )
}
