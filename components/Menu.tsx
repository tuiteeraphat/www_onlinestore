import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { headerMenu } from '../utils/constants'
import HeaderLink from './HeaderLink'
import HeaderLinkIcon from './HeaderLinkIcon'
import { BsLine } from 'react-icons/bs'
import { CgFacebook, CgInstagram } from 'react-icons/cg'
import {
    HomeIcon,
    FolderOpenIcon,
    CurrencyDollarIcon,
    ClipboardDocumentIcon,
    ShoppingCartIcon,
    HeartIcon,
    Bars3Icon,
    FolderIcon,
} from '@heroicons/react/24/solid'
import IconWithBadge from './IconWithBadge'
import MenuMobile from './MenuMobile'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import category from '@/models/category'
import LoginModel from '@/components/Login'
import RegisterModel from '@/components/Register'
import { checkAuthCustomer } from '@/utils/auth'
import Cookies from 'js-cookie'

function Menu() {
    checkAuthCustomer()
    const router = useRouter()

    const [clickOpenMenuMobile, setClickOpenMenuMobile] = useState(false)
    const auth = useSelector((state: any) => state.auth.data)
    const categories = useSelector((state: any) => state.category.data)
    const favorite = useSelector((state: any) => state.favorite.data)
    const cart = useSelector((state: any) => state.cart.data)

    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isRegisterOpen, setIsRegisterOpen] = useState(false)

    const openLogin = () => {
        setIsLoginOpen(true)
        setIsRegisterOpen(false)
    }

    const closeLogin = () => {
        setIsLoginOpen(false)
    }

    const openRegister = () => {
        setIsRegisterOpen(true)
        setIsLoginOpen(false)
    }

    const closeRegister = () => {
        setIsRegisterOpen(false)
    }

    return (
        <>
            <div
                className={`h-10 bg-topMenuBg text-topMenuFontColor justify-between items-center px-2 md:px-5 flex`}
            >
                <div className="hidden md:flex">
                    <span>ติดตามเราบน</span>
                    <HeaderLink href={headerMenu.facebookUrl}>
                        <CgFacebook />
                    </HeaderLink>
                    <HeaderLink href={headerMenu.instagramUrl}>
                        <CgInstagram />
                    </HeaderLink>
                    <HeaderLink href={headerMenu.lineUrl}>
                        <BsLine />
                    </HeaderLink>
                </div>

                <div className="flex w-full md:w-fit justify-between">
                    <HeaderLink href={headerMenu.helpUrl}>
                        ช่วยเหลือ?
                    </HeaderLink>
                    <span className="flex flex-row ml-2">
                        {auth ? (
                            <button
                                className="flex"
                                onClick={() => {
                                    Cookies.remove('auth')
                                    router.reload()
                                }}
                            >
                                <span className="hidden sm:block mr-2">
                                    {`[${auth && auth.email}]`}
                                </span>
                                ออกจากระบบ
                            </button>
                        ) : (
                            <>
                                <button onClick={openRegister} className="mr-1">
                                    สมัครสมาชิก
                                </button>
                                |
                                <button onClick={openLogin} className="ml-1">
                                    เข้าสู่ระบบ
                                </button>
                            </>
                        )}
                    </span>
                </div>
            </div>

            <div
                className={
                    'relative h-16 bg-mainMenuBg flex items-center justify-around px-1 md:px-5 text-mainMenuFontColor'
                }
            >
                <Link href={headerMenu.homeUrl}>
                    <div className="flex items-center">
                        <Image
                            src="/images/logo-white.png"
                            width="100"
                            height="100"
                            alt="logo-white"
                            priority={true}
                        />
                        {/* <p className="ml-2">{websiteName}</p> */}
                    </div>
                </Link>

                <div className="items-center hidden md:flex">
                    <HeaderLink href={headerMenu.homeUrl}>
                        <HeaderLinkIcon
                            icon={HomeIcon}
                            label="หน้าแรก"
                        ></HeaderLinkIcon>
                    </HeaderLink>
                    <HeaderLink href={headerMenu.discoutUrl}>
                        <HeaderLinkIcon
                            icon={CurrencyDollarIcon}
                            label="โค้ดลดราคา"
                        ></HeaderLinkIcon>
                    </HeaderLink>
                    <div className="dropdown relative group">
                        <HeaderLink href={headerMenu.categoryUrl}>
                            <HeaderLinkIcon
                                icon={FolderOpenIcon}
                                label="หมวดหมู่สินค้า"
                            ></HeaderLinkIcon>
                        </HeaderLink>
                        <div className="group-hover:flex hidden absolute rounded border flex-col bg-mainMenuBgBlur backdrop-blur-md">
                            {categories &&
                                categories.map((item: category) => {
                                    return (
                                        <React.Fragment
                                            key={item.category_id.toString()}
                                        >
                                            <div
                                                className={`py-2 px-4 flex items-center cursor-pointer`}
                                            >
                                                <FolderIcon className="h-5 mr-3" />
                                                <Link
                                                    href={`/category/${item.category_slug.toString()}`}
                                                    className="whitespace-nowrap"
                                                >
                                                    {`${item.category_name} (${item.product_count})`}
                                                </Link>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                        </div>
                    </div>

                    <HeaderLink href={headerMenu.orderUrl}>
                        <HeaderLinkIcon
                            icon={ClipboardDocumentIcon}
                            label="คำสั่งซื้อของฉัน"
                        ></HeaderLinkIcon>
                    </HeaderLink>
                </div>

                <div className="flex items-center">
                    <IconWithBadge
                        icon={HeartIcon}
                        href={headerMenu.favoriteUrl}
                        objectCount={favorite}
                    />
                    <IconWithBadge
                        icon={ShoppingCartIcon}
                        href={headerMenu.cartUrl}
                        objectCount={cart}
                    />
                    <Bars3Icon
                        className="h-5 ml-3 md:hidden"
                        onClick={() => {
                            setClickOpenMenuMobile(!clickOpenMenuMobile)
                        }}
                    />
                </div>
            </div>
            {clickOpenMenuMobile && <MenuMobile />}
            <LoginModel isOpen={isLoginOpen} onClose={closeLogin} />
            <RegisterModel isOpen={isRegisterOpen} onClose={closeRegister} />
        </>
    )
}

export default Menu
