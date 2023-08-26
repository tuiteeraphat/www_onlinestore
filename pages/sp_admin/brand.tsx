import { useEffect, useState } from 'react'
import Head from 'next/head'
import Swal from 'sweetalert2'
// import { LockOpenIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import {
    // ArrowDownCircleIcon,
    ArrowDownOnSquareIcon,
    ArrowTopRightOnSquareIcon,
    // ArrowUpCircleIcon,
    Cog6ToothIcon,
    PlusCircleIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import ButtonTable from '@/components/sp_admin/ButtonTable'
import { checkAuthAdmin } from '@/utils/auth'
import { customAxios } from '@/utils/customHook'
import { titleName } from '@/utils/constants'
// import ProductManager from '@/components/sp_admin/ProductManager'
import product from '@/models/product'
// import CategoryManager from '@/components/sp_admin/CategoryManager'
import BrandManager from '@/components/sp_admin/BrandManager'
import brandType from '@/models/brand'

export async function getServerSideProps() {
    const response = await customAxios.get('/api/brand')
    const brandProps = response.data

    return { props: { brandProps } }
}

export default function Index({ brandProps }: any) {
    checkAuthAdmin()
    const [brands, setCategories] = useState(brandProps)
    const [isBrandOpen, setIsBrandOpen] = useState(false)
    const [brandId, setBrandId] = useState('')

    useEffect(() => {
        setCategories(brandProps)
    }, [brandProps])

    const brandClose = () => {
        setIsBrandOpen(false)
        setBrandId('')
    }

    const brandUpdate = (newBrand: brandType) => {
        const updateBrands = brands.data.filter(
            (item: brandType) => item.id != newBrand.id
        )

        const newBrands = [newBrand, ...updateBrands]
        setCategories({ ...brands, data: newBrands })
    }

    const handleDelete = async (id: string) => {
        try {
            await customAxios.delete(`api/brand/${id}`)
            setCategories((prevBrands: any) => {
                const updatedBrands = prevBrands.data.filter(
                    (item: any) => item.id !== id
                )
                return { ...prevBrands, data: updatedBrands }
            })
            Swal.fire('สำเร็จ', 'ข้อมูลถูกลบเรียบร้อยแล้ว', 'success')
        } catch (error: any) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: error.response.data.error.message,
                showConfirmButton: true,
                confirmButtonText: 'ตกลง',
                timer: 1500,
            })
        }
    }

    return (
        <>
            <Head>
                <title>{`${titleName} - จัดการยี้ห้อสินค้า`}</title>
            </Head>
            <div className="flex justify-start">
                <ButtonTable
                    icon={PlusCircleIcon}
                    text={'เพิ่มยี้ห้อสินค้าใหม่'}
                    onClick={() => {
                        setIsBrandOpen(true)
                    }}
                />
                <ButtonTable
                    icon={ArrowDownOnSquareIcon}
                    text={'นำเข้าข้อมูล'}
                />
                <ButtonTable
                    icon={ArrowTopRightOnSquareIcon}
                    text={'ส่งออกข้อมูล'}
                />
            </div>

            <BrandManager
                isOpen={isBrandOpen}
                closeBox={brandClose}
                update={brandUpdate}
                brandId={brandId}
            />

            <div className="relative overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-mainMenuBg text-white h-10">
                        <tr>
                            <th>ลำดับ</th>
                            <th>รหัสยี้ห้อ</th>
                            <th>หมวดหมู่</th>
                            <th>ชื่อยี้ห้อ</th>
                            <th className="sr-only"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands &&
                            brands.data.map((item: product, index: number) => (
                                <tr
                                    className="bg-white whitespace-nowrap text-center"
                                    key={item.id}
                                >
                                    <td className="border">{index + 1}</td>
                                    <td className="border">{item.id}</td>
                                    <td className="border">
                                        {item.Category.name}
                                    </td>
                                    <td className="border">{item.name}</td>
                                    <td className="px-4 py-2 flex">
                                        <Cog6ToothIcon
                                            className="h-5 mr-2 hover:text-menuBackdropBlurBgColor cursor-pointer"
                                            onClick={() => {
                                                setIsBrandOpen(true)
                                                setBrandId(item.id.toString())
                                            }}
                                        />
                                        <TrashIcon
                                            className="h-5 hover:text-menuBackdropBlurBgColor cursor-pointer"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: 'คุณแน่ใจไหม?',
                                                    text: 'ระบบกำลังจะลบข้อมูลที่คุณเลือกและไม่สามารถกู้คืนได้ แน่ใจหรือไม่?',
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    cancelButtonText: 'ยกเลิก',
                                                    confirmButtonText: 'ตกลง',
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        handleDelete(item.id)
                                                    }
                                                })
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
