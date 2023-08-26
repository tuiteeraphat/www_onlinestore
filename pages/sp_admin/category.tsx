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
import CategoryManager from '@/components/sp_admin/CategoryManager'
import categoryType from '@/models/category'

export async function getServerSideProps() {
    const response = await customAxios.get('/api/category')
    const categoriesProps = response.data

    return { props: { categoriesProps } }
}

export default function Index({ categoriesProps }: any) {
    checkAuthAdmin()
    const [categories, setCategories] = useState(categoriesProps)
    const [isProductOpen, setIsProductOpen] = useState(false)
    const [categoryId, setCategoryId] = useState('')

    useEffect(() => {
        setCategories(categoriesProps)
    }, [categoriesProps])

    const productClose = () => {
        setIsProductOpen(false)
        setCategoryId('')
    }

    const categoryUpdate = (newCategory: categoryType) => {
        const updateCategories = categories.data.filter(
            (item: categoryType) => item.id !== newCategory.id
        )

        const newCategories = [newCategory, ...updateCategories]
        setCategories({ ...categories, data: newCategories })
    }

    const handleDelete = async (id: string) => {
        try {
            await customAxios.delete(`api/category/${id}`)
            setCategories((prevProducts: any) => {
                const updatedProducts = prevProducts.data.filter(
                    (item: any) => item.id !== id
                )
                return { ...prevProducts, data: updatedProducts }
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
                <title>{`${titleName} - จัดการหมวดหมู่สินค้า`}</title>
            </Head>
            <div className="flex justify-start">
                <ButtonTable
                    icon={PlusCircleIcon}
                    text={'เพิ่มหมวดหมู่ใหม่'}
                    onClick={() => {
                        setIsProductOpen(true)
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

            <CategoryManager
                isOpen={isProductOpen}
                closeBox={productClose}
                update={categoryUpdate}
                categoryId={categoryId}
            />

            <div className="relative overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-mainMenuBg text-white h-10">
                        <tr>
                            <th>ลำดับ</th>
                            <th>รหัสหมวดหมู่</th>
                            <th>ชื่อหมวดหมู่</th>
                            <th className="sr-only"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories &&
                            categories.data.map(
                                (item: product, index: number) => (
                                    <tr
                                        className="bg-white whitespace-nowrap text-center"
                                        key={item.id}
                                    >
                                        <td className="border">{index + 1}</td>
                                        <td className="border">{item.id}</td>
                                        <td className="border">{item.name}</td>
                                        <td className="px-4 py-2 flex">
                                            <Cog6ToothIcon
                                                className="h-5 mr-2 hover:text-menuBackdropBlurBgColor cursor-pointer"
                                                onClick={() => {
                                                    setIsProductOpen(true)
                                                    setCategoryId(
                                                        item.id.toString()
                                                    )
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
                                                        cancelButtonText:
                                                            'ยกเลิก',
                                                        confirmButtonText:
                                                            'ตกลง',
                                                    }).then((result) => {
                                                        if (
                                                            result.isConfirmed
                                                        ) {
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                    })
                                                }}
                                            />
                                        </td>
                                    </tr>
                                )
                            )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
