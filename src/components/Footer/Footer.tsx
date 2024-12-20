import Link from 'next/link'
import { config } from './config'
import { FacebookIcon } from '../Icons/FacebookIcon'
import { InstagramIcon } from '../Icons/InstagramIcon'
import { LinkedInIcon } from '../Icons/LinkedInIcon'

const FooterLink = ({ href = '/', label = '' }) => {
  return (
    <Link key={label} href={href} className="whitespace-nowrap text-[14px]">
      {label}
    </Link>
  )
}

export const Footer = () => {
  return (
    <div className="mt-auto flex flex-col bg-gray-300 px-[16px] pb-[38px] pt-[118px] sm:px-[60px] md:px-[60px]">
      <div className="flex flex-col justify-between md:flex-row">
        <div className="mb-[60px]">
          <p className="mb-[50px] md:mr-[50px]">
            Go Alberta Connect: Your Gateway to Supporting Local We Promote Alberta Businesses by helping you Invest
            Local, Learn Local, Cheer Local, and Buy Local - Showcasing Everything Alberta
          </p>
          <div>
            <p className="mb-[10px] text-[14px]">Follow us</p>
            <div className="flex gap-[24px]">
              <a href="https://www.facebook.com/goalbertago">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/goalbertaconnect">
                <InstagramIcon />
              </a>
              <a href="https://www.linkedin.com/company/goalbertago">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mb-[60px] flex flex-row flex-wrap gap-[38px] sm:flex-nowrap lg:mr-[83px]">
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

      <div className="flex flex-row flex-wrap justify-end gap-[24px]">
        {config.bottomLinks.map(({ href, label }) => (
          <FooterLink key={label} href={href} label={label} />
        ))}
        <p className="text-[14px]">© 2024 Go Alberta Connect Corp.</p>
      </div>
    </div>
  )
}
