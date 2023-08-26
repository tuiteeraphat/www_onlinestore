import { customAxios } from '@/utils/customHook'
import ButtonTable from './ButtonTable'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import brandType from '@/models/brand'
import { Select, TextInput } from 'flowbite-react'

interface categoryType {
    id: string
    name: string
}

interface props {
    isOpen: boolean
    closeBox: () => void
    update: (newBrand: brandType) => void
    brandId: String
}

export default function BrandManager({
    isOpen,
    closeBox,
    update,
    brandId,
}: props) {
    if (!isOpen) return null

    const nameRef = useRef<HTMLInputElement>(null)
    const categoryRef = useRef<HTMLSelectElement>(null)
    const [brand, setBrand] = useState<brandType>()
    const [categories, setCategories] = useState<categoryType[]>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await customAxios.get(`/api/brand/${brandId}`)

                if (response.status == 200) {
                    setBrand(response.data.brand)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const fetchCategoryDropdownData = async () => {
            try {
                const response = await customAxios.get(`/api/category`)

                if (response.status == 200) {
                    setCategories(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        brandId && fetchData()
        fetchCategoryDropdownData()
    }, [])

    const checkBeforeCancel = () => {
        closeBox()
    }

    const handleSubmit = async () => {
        const name = nameRef.current?.value
        const category_id = categoryRef.current?.value

        if (!name) {
            return Swal.fire(
                'คำเตือน',
                'คุณกรอกข้อมูลยังไม่ครบ กรุณาลองใหม่อีกครั้ง',
                'warning'
            )
        }

        try {
            const response = brandId.length
                ? await customAxios.put(`/api/brand/${brandId}`, {
                      name,
                      category_id,
                  })
                : await customAxios.post('/api/brand', {
                      name,
                      category_id,
                  })

            update(response.data.data)
            Swal.fire(
                'สำเร็จ',
                'ข้อมูลถูกบันทึกลงในระบบเรียบร้อยแล้ว',
                'success'
            )
            closeBox()
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="w-full border-4 border-dashed rounded mb-3 p-5 flex justify-center">
                <Select ref={categoryRef} className="mr-2">
                    {categories &&
                        categories.map((item: categoryType) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                </Select>
                <TextInput
                    placeholder="ชื่อยี้ห้อสินค้า"
                    required
                    shadow
                    type="text"
                    ref={nameRef}
                    defaultValue={brand && brand.name}
                    className="mr-2"
                />
                <div className="flex items-center">
                    <ButtonTable
                        text="บันทึก"
                        icon={CheckCircleIcon}
                        onClick={() => {
                            handleSubmit()
                        }}
                    />
                    <ButtonTable
                        text="ยกเลิก"
                        icon={XCircleIcon}
                        onClick={checkBeforeCancel}
                    />
                </div>
            </div>
        </>
    )
}
