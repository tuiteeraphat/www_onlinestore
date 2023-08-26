import { customAxios } from '@/utils/customHook'
import ButtonTable from './ButtonTable'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import categoryType from '@/models/category'
import { TextInput } from 'flowbite-react'
import Swal from 'sweetalert2'

interface props {
    isOpen: boolean
    closeBox: () => void
    update: (newCategory: categoryType) => void
    categoryId: String
}

export default function CategoryManager({
    isOpen,
    closeBox,
    update,
    categoryId,
}: props) {
    if (!isOpen) return null

    const nameRef = useRef<HTMLInputElement>(null)
    const [category, setCategory] = useState<categoryType>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await customAxios.get(
                    `/api/category/${categoryId}`
                )

                if (response.status == 200) {
                    setCategory(response.data.category)
                }
            } catch (error) {
                console.log(error)
            }
        }

        categoryId && fetchData()
    }, [])

    const handleSubmit = async () => {
        const name = nameRef.current?.value

        try {
            const response = categoryId.length
                ? await customAxios.put(`/api/category/${categoryId}`, {
                      name,
                  })
                : await customAxios.post('/api/category', {
                      name,
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
                <TextInput
                    placeholder="ชื่อหมวดหมู่"
                    required
                    shadow
                    type="text"
                    ref={nameRef}
                    className="mr-2"
                    defaultValue={category && category.name}
                />
                <div className="flex items-center">
                    <ButtonTable
                        text="บันทึก"
                        icon={CheckCircleIcon}
                        onClick={handleSubmit}
                    />
                    <ButtonTable
                        text="ยกเลิก"
                        icon={XCircleIcon}
                        onClick={closeBox}
                    />
                </div>
            </div>
        </>
    )
}
