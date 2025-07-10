'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IoMenu } from 'react-icons/io5'
import { useClickAway } from 'react-use'
import { cn } from '../utils/cn'

const dashboarSignup = 'https://devnet-dashboard.aro.network/signup'

const headerTabList = [
  { href: '/get-a-node', tabName: 'Get A Node', },
  { href: 'https://medium.com/@AroNetwork', tabName: 'Blog', },
  { href: 'https://docs.aro.network/', tabName: 'Docs' },
  { href: '/dashboard', tabName: 'Dashboard' },
  { href: dashboarSignup, tabName: 'Get Started' },
];

const maxWidthClassName = 'max-w-[1140px] px-4 w-full mx-auto'

function MBtn({ type = '1', className, onClick, content, contentClassName, ref }: { type?: '1' | '2' | "3", className?: string, onClick?: () => void, content?: React.ReactNode, contentClassName?: string, ref?: React.Ref<HTMLDivElement> }) {
  return <div className={cn('cursor-pointer text-sm select-none rounded-full w-fit transition-all bg-no-repeat hover:animate-bg-in', {
    'text-[#A6A7AD] hover:bg-btn hover:text-[#11111C]': type == '1',
    'bg-btn text-[#11111C] hover:bg-btnHover borderLinerGridentL2 border': type == '2',
    "bg-white/10 text-white text-left text-base h-[48px] flex items-center": type == '3',
  }, className)} onClick={onClick} ref={ref as any}>
    <div className={cn("select-none w-fit rounded-full transition-all", {
      'px-2 py-1': type == '1',
      'px-9 py-3.5  hover:bg-btn hover:bg-clip-text hover:text-transparent transition-all bg-no-repeat hover:animate-bg-in': type == '2',
      "px-6": type == '3',
    }, contentClassName)}>
      {content}
    </div>
  </div>
}

export default function Header() {
  const r = useRouter()
  const goTo = (urlpath: string) => {
    if (urlpath === '/blog' || urlpath === '/get-a-node' || urlpath === '/dashboard') {
      r.push(urlpath)
    } else {
      window.open(urlpath, '_blank')
    }
  }
  const [showMenus, setShowMenus] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const trigerRef = useRef<HTMLDivElement>(null)
  useClickAway(ref, (e) => {
    if (e.target && trigerRef.current && !trigerRef.current.contains(e.target as any)) {
      setShowMenus(false)
    }
  })

  return (
    <div className="w-full fixed top-0 z-50">
      <div className="bg-[#1A1A1A] flex w-full h-[71px] xs:h-[56px] iphone-se:h-[56px] iphone-xr:h-[60px] iphone-12-pro:h-[58px] iphone-14-pro-max:h-[62px] pixel-7:h-[60px] galaxy-s8:h-[56px] galaxy-s20:h-[58px] galaxy-a51:h-[58px] android:h-[58px] sm:h-[64px] surface-duo:h-[60px] galaxy-fold:h-[58px] ipad-mini:h-[66px] ipad-air:h-[68px] tablet:h-[66px] ipad:h-[68px] ipad-pro:h-[70px] surface-pro:h-[70px] zenbook-fold:h-[72px] nest-hub:h-[70px] nest-hub-max:h-[72px] md:h-[68px] mobile-header border-b border-[#333333]">
        <div className={cn("flex items-center gap-5 mx-auto relative mo:px-0", maxWidthClassName)}>
          <div className="xs:px-3 iphone-se:px-3 iphone-xr:px-4 iphone-12-pro:px-3.5 iphone-14-pro-max:px-4 pixel-7:px-4 galaxy-s8:px-3 galaxy-s20:px-3.5 galaxy-a51:px-3.5 android:px-3.5 sm:px-4 surface-duo:px-4 galaxy-fold:px-3 ipad-mini:px-6 ipad-air:px-6 tablet:px-6 ipad:px-8 ipad-pro:px-8 surface-pro:px-8 zenbook-fold:px-10 nest-hub:px-8 nest-hub-max:px-10 md:px-8 flex w-full justify-between items-center">
            <Link href={'/'} className="flex items-center mr-auto">
              <img 
                alt="ARO Network Logo" 
                src="/aro-logo.svg" 
                className="w-[205px] h-auto xs:w-[120px] iphone-se:w-[120px] iphone-xr:w-[130px] iphone-12-pro:w-[125px] iphone-14-pro-max:w-[135px] pixel-7:w-[130px] galaxy-s8:w-[120px] galaxy-s20:w-[125px] galaxy-a51:w-[125px] android:w-[125px] sm:w-[140px] surface-duo:w-[140px] galaxy-fold:w-[120px] ipad-mini:w-[160px] ipad-air:w-[170px] tablet:w-[160px] ipad:w-[180px] ipad-pro:w-[190px] surface-pro:w-[190px] zenbook-fold:w-[200px] nest-hub:w-[190px] nest-hub-max:w-[200px] md:w-[180px] lg:w-[205px] transition-all duration-300" 
              />
            </Link>
            <div className="flex items-center gap-5 mo:hidden">
              {
                headerTabList.map((item, i) =>
                  <MBtn key={`head_${i}`}
                    type={i === headerTabList.length - 1 ? '2' : '1'}
                    contentClassName={i === headerTabList.length - 1 ? 'py-2.5 font-Space_Grotesk' : ''}
                    onClick={() => goTo(item.href)} content={item.tabName} className={i === headerTabList.length - 1 ? 'ml-4' : ''} />
                )
              }
            </div>

            <div className="hidden mo:flex items-center">
              <MBtn 
                ref={trigerRef} 
                type="2" 
                className="rounded-lg bg-[#00FF0D] hover:bg-[#00E60C] border-none shadow-lg" 
                contentClassName="xs:px-3 xs:py-2 iphone-se:px-3 iphone-se:py-2 iphone-xr:px-3.5 iphone-xr:py-2.5 iphone-12-pro:px-3 iphone-12-pro:py-2 iphone-14-pro-max:px-3.5 iphone-14-pro-max:py-2.5 pixel-7:px-3.5 pixel-7:py-2.5 galaxy-s8:px-3 galaxy-s8:py-2 galaxy-s20:px-3 galaxy-s20:py-2 galaxy-a51:px-3 galaxy-a51:py-2 android:px-3 android:py-2 sm:px-4 sm:py-2.5 surface-duo:px-3.5 surface-duo:py-2.5 galaxy-fold:px-3 galaxy-fold:py-2 ipad-mini:px-4 ipad-mini:py-2.5 ipad-air:px-4 ipad-air:py-2.5 tablet:px-4 tablet:py-2.5 ipad-pro:px-4.5 ipad-pro:py-3 surface-pro:px-4.5 surface-pro:py-3 zenbook-fold:px-5 zenbook-fold:py-3.5 nest-hub:px-4.5 nest-hub:py-3 nest-hub-max:px-5 nest-hub-max:py-3.5 xs:text-xl iphone-se:text-xl iphone-xr:text-2xl iphone-12-pro:text-xl iphone-14-pro-max:text-2xl pixel-7:text-2xl galaxy-s8:text-xl galaxy-s20:text-xl galaxy-a51:text-xl android:text-xl sm:text-2xl surface-duo:text-2xl galaxy-fold:text-xl ipad-mini:text-2xl ipad-air:text-2xl tablet:text-2xl ipad-pro:text-3xl surface-pro:text-3xl zenbook-fold:text-3xl nest-hub:text-3xl nest-hub-max:text-3xl text-black hover:text-black font-bold" 
                content={<IoMenu />} 
                onClick={() => setShowMenus(!showMenus)} 
              />
            </div>
          </div>
          <div ref={ref} className={cn("absolute top-full hidden w-full mo:flex bg-[#1A1A1A] border-t border-[#333333] transition-all xs:p-4 iphone-se:p-4 iphone-xr:p-4 iphone-12-pro:p-4 iphone-14-pro-max:p-5 pixel-7:p-4 galaxy-s8:p-4 galaxy-s20:p-4 galaxy-a51:p-4 android:p-4 sm:p-5 surface-duo:p-4 galaxy-fold:p-4 ipad-mini:p-6 ipad-air:p-6 tablet:p-6 ipad-pro:p-7 surface-pro:p-7 zenbook-fold:p-8 nest-hub:p-7 nest-hub-max:p-8 flex-col xs:gap-3 iphone-se:gap-3 iphone-xr:gap-3 iphone-12-pro:gap-3 iphone-14-pro-max:gap-4 pixel-7:gap-3 galaxy-s8:gap-3 galaxy-s20:gap-3 galaxy-a51:gap-3 android:gap-3 sm:gap-4 surface-duo:gap-3 galaxy-fold:gap-3 ipad-mini:gap-4 ipad-air:gap-4 tablet:gap-4 ipad-pro:gap-5 surface-pro:gap-5 zenbook-fold:gap-6 nest-hub:gap-5 nest-hub-max:gap-6 z-10 shadow-2xl backdrop-blur-md", showMenus ? "translate-x-0" : "translate-x-full !hidden")}>
            {headerTabList.slice(0, headerTabList.length - 1).map((item, i) => 
              <MBtn 
                key={`head_${i}`} 
                type="3" 
                className="w-full hover:bg-white/5 rounded-lg transition-colors duration-200" 
                contentClassName="xs:py-3 iphone-se:py-3 iphone-xr:py-3.5 iphone-12-pro:py-3 iphone-14-pro-max:py-3.5 pixel-7:py-3.5 galaxy-s8:py-3 galaxy-s20:py-3 galaxy-a51:py-3 android:py-3 sm:py-4 surface-duo:py-3.5 galaxy-fold:py-3 ipad-mini:py-4 ipad-air:py-4 tablet:py-4 ipad-pro:py-5 surface-pro:py-5 zenbook-fold:py-6 nest-hub:py-5 nest-hub-max:py-6 xs:text-sm iphone-se:text-sm iphone-xr:text-base iphone-12-pro:text-sm iphone-14-pro-max:text-base pixel-7:text-base galaxy-s8:text-sm galaxy-s20:text-sm galaxy-a51:text-sm android:text-sm sm:text-base surface-duo:text-base galaxy-fold:text-sm ipad-mini:text-base ipad-air:text-base tablet:text-base ipad-pro:text-lg surface-pro:text-lg zenbook-fold:text-xl nest-hub:text-lg nest-hub-max:text-xl" 
                onClick={() => {
                  goTo(item.href);
                  setShowMenus(false);
                }} 
                content={item.tabName} 
              />
            )}
            <div className="xs:mt-1 xs:pt-3 iphone-se:mt-1 iphone-se:pt-3 iphone-xr:mt-2 iphone-xr:pt-4 iphone-12-pro:mt-1 iphone-12-pro:pt-3 iphone-14-pro-max:mt-2 iphone-14-pro-max:pt-4 pixel-7:mt-2 pixel-7:pt-4 galaxy-s8:mt-1 galaxy-s8:pt-3 galaxy-s20:mt-1 galaxy-s20:pt-3 galaxy-a51:mt-1 galaxy-a51:pt-3 android:mt-1 android:pt-3 sm:mt-2 sm:pt-4 surface-duo:mt-2 surface-duo:pt-4 galaxy-fold:mt-1 galaxy-fold:pt-3 ipad-mini:mt-2 ipad-mini:pt-4 ipad-air:mt-2 ipad-air:pt-4 tablet:mt-2 tablet:pt-4 ipad-pro:mt-3 ipad-pro:pt-5 surface-pro:mt-3 surface-pro:pt-5 zenbook-fold:mt-4 zenbook-fold:pt-6 nest-hub:mt-3 nest-hub:pt-5 nest-hub-max:mt-4 nest-hub-max:pt-6 border-t border-[#333333]">
              <MBtn 
                type="2" 
                className="w-full bg-[#00FF0D] hover:bg-[#00E60C] text-black rounded-lg shadow-lg transition-colors duration-200" 
                contentClassName="xs:py-2.5 iphone-se:py-2.5 iphone-xr:py-3 iphone-12-pro:py-2.5 iphone-14-pro-max:py-3 pixel-7:py-3 galaxy-s8:py-2.5 galaxy-s20:py-2.5 galaxy-a51:py-2.5 android:py-2.5 sm:py-3 surface-duo:py-3 galaxy-fold:py-2.5 ipad-mini:py-3.5 ipad-air:py-3.5 tablet:py-3.5 ipad-pro:py-4 surface-pro:py-4 zenbook-fold:py-5 nest-hub:py-4 nest-hub-max:py-5 font-Space_Grotesk font-bold xs:text-sm iphone-se:text-sm iphone-xr:text-base iphone-12-pro:text-sm iphone-14-pro-max:text-base pixel-7:text-base galaxy-s8:text-sm galaxy-s20:text-sm galaxy-a51:text-sm android:text-sm sm:text-base surface-duo:text-base galaxy-fold:text-sm ipad-mini:text-base ipad-air:text-base tablet:text-base ipad-pro:text-lg surface-pro:text-lg zenbook-fold:text-xl nest-hub:text-lg nest-hub-max:text-xl" 
                onClick={() => {
                  goTo(dashboarSignup);
                  setShowMenus(false);
                }} 
                content="Get Started" 
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-[#333333]"></div>
    </div>
  )
}

export { MBtn };