import {
    ArrowPathRoundedSquareIcon,
    CurrencyDollarIcon,
    FolderIcon,
    HomeIcon,
    TagIcon,
} from '@heroicons/react/24/outline'
import { headerMenu } from '../utils/constants'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import categoryType from '@/models/category'

function MenuMobile() {
    const categories = useSelector((state: any) => state.category.data)
    return (
        <>
            <div
                className={`absolute right-0 flex-col items-center 
        } md:hidden text-mainMenuFontColor rounded-xl border bg-mainMenuBg backdrop-blur-md`}
            >
                <Link
                    href={headerMenu.homeUrl}
                    className="p-5  w-full flex rounded-t"
                >
                    <HomeIcon className="h-5 mr-1" />
                    หน้าแรก
                </Link>
                <Link href={headerMenu.discoutUrl} className="p-5 w-full flex">
                    <CurrencyDollarIcon className="h-5 mr-1" />
                    โค้ดลดราคา
                </Link>

                <div className="group relative inline-block w-full">
                    <div className=" flex items-center p-5">
                        <TagIcon className="h-5 mr-1" />
                        <span>หมวดหมู่สินค้า</span>
                    </div>

                    <div className="group-hover:flex px-5 flex-col hidden">
                        {categories &&
                            categories.map((category: categoryType) => {
                                return (
                                    <React.Fragment
                                        key={category.id.toString()}
                                    >
                                        <Link
                                            href={`/category/${category.slug.toString()}`}
                                            className="py-2 flex items-center"
                                        >
                                            <FolderIcon className="h-5 mr-1" />
                                            {`${category.name} (0)`}
                                        </Link>
                                    </React.Fragment>
                                )
                            })}
                    </div>
                </div>

                <Link href={headerMenu.orderUrl} className="p-5 w-full flex">
                    <ArrowPathRoundedSquareIcon className="h-5 mr-1" />
                    คำสั่งซื้อของฉัน
                </Link>
            </div>
        </>
    )
}

export default MenuMobile
