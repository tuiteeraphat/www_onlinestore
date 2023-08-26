import Image from 'next/image'
import { adminBaseUrl, adminMenu } from '@/utils/constants'
import {
    ArrowRightOnRectangleIcon,
    ClipboardIcon,
    Cog6ToothIcon,
    CubeIcon,
    CurrencyDollarIcon,
    FolderIcon,
    HomeIcon,
    TagIcon,
    UserGroupIcon,
} from '@heroicons/react/24/solid'
import MenuLinkSidebar from './MenuLinkSidebar'
import { Cog8ToothIcon, LinkIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export default function Sidebar() {
    const router = useRouter()
    const auth = useSelector((state: any) => state.auth.data)
    return (
        <nav className="overflow-y-scroll sm:overflow-visible w-24 bg-mainMenuBg text-mainMenuFontColor z-40 fixed h-full flex justify-center py-5 duration-300 group hover:w-64 hover:border-r-4 hover:border-topMenuBg">
            <ul className="flex flex-col items-center justify-between overflow-x-hidden">
                <div className="flex flex-col items-center">
                    <span className="flex flex-col items-center text-center mb-5">
                        <Image
                            src={'/images/no-profile-image.png'}
                            width={50}
                            height={50}
                            alt="logo"
                            priority={true}
                        />
                        {auth && (
                            <span className="hidden group-hover:block mt-5">{`${auth.email}`}</span>
                        )}
                        {auth && (
                            <span className="hidden group-hover:block">{` ${
                                auth.is_supervisor
                                    ? '(อำนาจสูงสุด)'
                                    : '(แอดมิน)'
                            }`}</span>
                        )}
                    </span>
                    <div>
                        <MenuLinkSidebar
                            icon={HomeIcon}
                            text="ภาพรวม"
                            href={adminBaseUrl}
                        />
                        <MenuLinkSidebar
                            icon={Cog6ToothIcon}
                            text="จัดการข้อมูลหน้าร้าน"
                            href="#"
                        />
                        <div className="group-hover:ml-5">
                            <MenuLinkSidebar
                                icon={FolderIcon}
                                text="สินค้า"
                                href={adminMenu.productUrl}
                            />
                            <MenuLinkSidebar
                                icon={FolderIcon}
                                text="หมวดหมู่"
                                href={adminMenu.categoryUrl}
                            />
                            <MenuLinkSidebar
                                icon={FolderIcon}
                                text="ยี้ห้อ"
                                href={adminMenu.brandUrl}
                            />
                            <MenuLinkSidebar
                                icon={FolderIcon}
                                text="คำสั่งซื้อ"
                                href={adminMenu.orderUrl}
                            />
                        </div>
                        <MenuLinkSidebar
                            icon={Cog6ToothIcon}
                            text="จัดการข้อมูลผู้ใช้งาน"
                            href="#"
                        />
                        <div className="group-hover:ml-5">
                            <MenuLinkSidebar
                                icon={FolderIcon}
                                text="ลูกค้า"
                                href={adminMenu.orderUrl}
                            />
                            <MenuLinkSidebar
                                icon={FolderIcon}
                                text="พนักงาน"
                                href={adminMenu.orderUrl}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <MenuLinkSidebar
                        icon={LinkIcon}
                        text="ลิงค์ดูหน้าร้าน"
                        href={'/'}
                    />
                    <MenuLinkSidebar
                        icon={Cog8ToothIcon}
                        text="ตั้งค่าโปรไฟล์"
                        href={''}
                    />
                    <button
                        onClick={() => {
                            Cookies.remove('auth')
                            router.reload()
                        }}
                    >
                        <MenuLinkSidebar
                            icon={ArrowRightOnRectangleIcon}
                            text="ออกจากระบบ"
                            href={''}
                        />
                    </button>
                </div>
            </ul>
        </nav>
    )
}
