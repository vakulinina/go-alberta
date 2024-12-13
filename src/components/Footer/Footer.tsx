import Link from 'next/link'
import { config } from './config'

const FooterLink = ({ href = '/', label = '' }) => {
  return (
    <Link key={label} href={href} className="text-[14px]">
      {label}
    </Link>
  )
}

export const Footer = () => {
  return (
    <div className="mt-auto flex h-[514px] flex-col bg-gray-300 px-[90px] pb-[38px] pt-[118px]">
      <div className="flex justify-between">
        <div>
          <p className="mb-[50px] mr-[50px]">
            Go Alberta Connect: Your Gateway to Supporting Local We Promote Alberta Businesses by helping you Invest
            Local, Learn Local, Cheer Local, and Buy Local - Showcasing Everything Alberta
          </p>
          <div>
            <p className="text-[14px]">Follow us</p>
            <div>{'<social icons>'}</div>
          </div>
        </div>
        <div className="mr-[83px] flex gap-[38px]">
          {config.columnLinks.map(({ title, links }) => (
            <div key={title} className="flex max-w-[120px] flex-col">
              <p className="mb-[12px] text-[14px] uppercase">{title}</p>
              {links.map(({ href, label }) => (
                <FooterLink key={label} href={href} label={label} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <span className="mb-[24px] mt-auto block h-[1px] w-full bg-[#BABABA]" />
      <div className="flex justify-end gap-[24px]">
        {config.bottomLinks.map(({ href, label }) => (
          <FooterLink key={label} href={href} label={label} />
        ))}
        <p className="text-[14px]">© 2024 Go Alberta Connect Corp.</p>
      </div>
    </div>
  )
}
