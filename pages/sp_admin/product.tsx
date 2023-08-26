import { useEffect, useState } from 'react'
import Head from 'next/head'
import Swal from 'sweetalert2'
import { LockOpenIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import {
    ArrowDownOnSquareIcon,
    ArrowTopRightOnSquareIcon,
    Cog6ToothIcon,
    PlusCircleIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import ButtonTable from '@/components/sp_admin/ButtonTable'
import { checkAuthAdmin } from '@/utils/auth'
import { customAxios } from '@/utils/customHook'
import { titleName } from '@/utils/constants'
import ProductManager from '@/components/sp_admin/ProductManager'
import ProductModel from '@/models/product'
import formatCurrency from '@/utils/formatCurrency'
import checkName from '@/utils/checkName'
import { Pagination } from 'flowbite-react'

export async function getServerSideProps() {
    const response = await customAxios.get('/api/product')
    const productsProps = response.data

    return { props: { productsProps } }
}

export default function Index({ productsProps }: any) {
    checkAuthAdmin()
    const [products, setProducts] = useState(productsProps)
    const [isProductOpen, setIsProductOpen] = useState(false)
    const [productId, setProductId] = useState('')
    const [currentPage, setCurrentPage] = useState(products.currentPage)
    const onPageChange = async (page: number) => {
        setCurrentPage(page)
        try {
            const response = await customAxios.get(`/api/product/?page=${page}`)
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        setProducts(productsProps)
    }, [productsProps])

    const productClose = () => {
        setIsProductOpen(false)
        setProductId('')
    }

    const productUpdate = (newProduct: ProductModel) => {
        const updatedProducts = products.data.filter(
            (item: ProductModel) => item.id !== newProduct.id
        )

        const newProducts = [newProduct, ...updatedProducts]
        setProducts({ ...products, data: newProducts })
    }

    const handleDelete = async (id: string) => {
        try {
            await customAxios.delete(`api/product/${id}`)
            setProducts((prevProducts: any) => {
                const updatedProducts = prevProducts.data.filter(
                    (item: any) => item.id !== id
                )
                return { ...prevProducts, data: updatedProducts }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Head>
                <title>{`${titleName} - จัดการสินค้า`}</title>
            </Head>
            <div className="flex justify-start">
                <ButtonTable
                    icon={PlusCircleIcon}
                    text={'เพิ่มสินค้าใหม่'}
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

            <ProductManager
                isOpen={isProductOpen}
                closeBox={productClose}
                update={productUpdate}
                productId={productId}
            />

            <div className="relative overflow-x-auto">
                <table className="w-full whitespace-nowrap shadow">
                    <thead className="bg-mainMenuBg text-white">
                        <tr className="h-10">
                            <th>ลำดับ</th>
                            <th>รหัสสินค้า</th>
                            <th>ชื่อสินค้า</th>
                            <th>ราคาสินค้า</th>
                            <th>หมวดหมู่สินค้า</th>
                            <th>ยี้ห้อสินค้า</th>
                            <th>จำนวนสต๊อก</th>
                            <th>ขายแล้ว</th>
                            <th>ส่วนลดสินค้า</th>
                            <th>สถานะสินค้า</th>
                            <th className="sr-only"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.data.map(
                            (item: ProductModel, index: number) => (
                                <tr
                                    className="bg-white whitespace-nowrap"
                                    key={item.id}
                                >
                                    <td className="border p-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border p-2">{item.id}</td>
                                    <td className="border p-2">
                                        {checkName(item.name.toString(), 35)}
                                    </td>
                                    <td className="border p-2">
                                        {formatCurrency(item.price)}
                                    </td>
                                    <td className="border p-2">
                                        {item.Category
                                            ? item.Category.name
                                            : '-'}
                                    </td>
                                    <td className="border p-2">
                                        {item.Brand ? item.Brand.name : '-'}
                                    </td>
                                    <td className="border p-2">{item.stock}</td>
                                    <td className="border p-2">
                                        {item.sold == 0 ? '-' : item.sold}
                                    </td>
                                    <td className="border p-2">
                                        {item.discount !== 0
                                            ? `${item.discount}%`
                                            : '-'}
                                    </td>
                                    <td className="border p-2">
                                        {item.is_show ? (
                                            <span className="flex justify-center">
                                                <LockOpenIcon className="h-5 text-green-500" />
                                            </span>
                                        ) : (
                                            <span className="flex justify-center">
                                                <LockClosedIcon className="h-5 text-red-500" />
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 flex">
                                        <Cog6ToothIcon
                                            className="h-5 mr-2 hover:text-menuBackdropBlurBgColor cursor-pointer"
                                            onClick={() => {
                                                setIsProductOpen(true)
                                                setProductId(item.id.toString())
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
                                                        Swal.fire(
                                                            'สำเร็จ',
                                                            'ข้อมูลถูกลบออกจากระบบเรียบร้อยแล้ว',
                                                            'success'
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
                <Pagination
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    showIcons
                    totalPages={products.totalPages}
                    nextLabel="ถัดไป"
                    previousLabel="ย้อนกลับ"
                />
            </div>
        </>
    )
}
