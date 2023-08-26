import { customAxios } from '@/utils/customHook'
import ButtonTable from './ButtonTable'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import ProductModel from '@/models/product'
import Swal from 'sweetalert2'
import categoryType from '@/models/category'
import brandType from '@/models/brand'
import { FileInput, Label, Select, TextInput, Textarea } from 'flowbite-react'
import {
    ArrowPathIcon,
    ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/solid'

interface props {
    isOpen: boolean
    closeBox: () => void
    update: (newProduct: ProductModel) => void
    productId: String
}

export default function ProductManager({
    isOpen,
    closeBox,
    update,
    productId,
}: props) {
    if (!isOpen) return null

    const nameRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const stockRef = useRef<HTMLInputElement>(null)
    const discountRef = useRef<HTMLInputElement>(null)
    const detailRef = useRef<HTMLTextAreaElement>(null)
    const categoryRef = useRef<HTMLSelectElement>(null)
    const brandRef = useRef<HTMLSelectElement>(null)

    const [selectedImageUpload, setSelectedImageUpload] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [product, setProduct] = useState<ProductModel>()
    const [categories, setCategories] = useState<categoryType[]>()
    const [brands, setBrands] = useState<brandType[]>()

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await customAxios.get(`/api/category`)

                if (response.status == 200) {
                    setCategories(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const fetchBrand = async () => {
            try {
                const response = await customAxios.get(`/api/brand`)

                if (response.status == 200) {
                    setBrands(response.data.data)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchCategory()
        fetchBrand()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                Swal.showLoading()
                const response = await customAxios.get(
                    `/api/product/${productId}`
                )

                if (response.status == 200) {
                    Swal.close()
                    setProduct(response.data.product)
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (productId) {
            fetchData()
        }
    }, [productId])

    useEffect(() => {
        if (product?.image) {
            const newPreviews: string[] = []
            product.image.forEach((item: string) => {
                newPreviews.push(`http://localhost:8000/uploads/${item}`)
            })
            setImagePreviews(newPreviews)
        }
    }, [product])

    const handleSubmit = async () => {
        const name = nameRef.current?.value
        const price = priceRef.current?.value
        const stock = stockRef.current?.value
        const detail = detailRef.current?.value
        const discount = discountRef.current?.value
        const category = categoryRef.current?.value
        const brand = brandRef.current?.value

        if (!name || !price || !stock) {
            return Swal.fire(
                'คำเตือน',
                'คุณกรอกข้อมูลยังไม่ครบ กรุณาลองใหม่อีกครั้ง',
                'warning'
            )
        } else {
            Swal.showLoading()
        }

        const formData = new FormData()

        formData.append('name', name || '')
        formData.append('price', price || '')
        formData.append('stock', stock || '')
        formData.append('detail', detail || '')
        formData.append('discount', discount || '')
        formData.append('category_id', category || product?.category_id || '')
        formData.append('brand_id', brand || product?.brand_id || '')

        selectedImageUpload.forEach((image, index) => {
            formData.append(`${index}`, image)
        })

        try {
            const response = productId.length
                ? await customAxios.put(`/api/product/${productId}`, formData, {
                      headers: { 'Content-Type': 'multipart/form-data' },
                  })
                : await customAxios.post('/api/product', formData, {
                      headers: { 'Content-Type': 'multipart/form-data' },
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

    const handleImageUploadChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const images = Array.from(event.target.files || [])

        const checkUploadOverLimit = product
            ? product.image.length +
                  selectedImageUpload.length +
                  images.length >
              15
            : selectedImageUpload.length + images.length > 15

        if (checkUploadOverLimit) {
            Swal.fire(
                'คำเตือน',
                'รูปภาพเกินลิมิตที่ระบบกำหนดแล้ว ไม่สามารถเพิ่มได้มากกว่า 15 รูปภาพ',
                'warning'
            )
            return
        }

        setSelectedImageUpload([...selectedImageUpload, ...images])
        const newPreviews: string[] = []
        await Promise.all([
            images.map((item) => {
                const reader = new FileReader()
                reader.onload = (event: ProgressEvent<FileReader>) => {
                    if (event.target && event.target.result) {
                        newPreviews.push(event.target.result as string)
                        setImagePreviews([...imagePreviews, ...newPreviews])
                    }
                }
                reader.readAsDataURL(item)
            }),
        ])
    }

    const handleImageDelete = async (
        productId: string,
        imageName: string,
        index: number
    ) => {
        try {
            await customAxios.delete(
                `/api/product/remove-image/${productId}/${imageName}`
            )
            const oldImagePreview = imagePreviews.slice()
            const removeImagePreview = oldImagePreview.splice(index, 1)
            const newImagePreview = oldImagePreview.filter(
                (item) => item != removeImagePreview[0]
            )

            setImagePreviews(newImagePreview)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="w-full mb-3 flex justify-between">
                <div className="w-[50%] flex flex-col border rounded p-10 shadow bg-white">
                    <div className="grid grid-cols-2 gap-5 mb-5">
                        <TextInput
                            placeholder="ชื่อสินค้า"
                            required
                            shadow
                            type="text"
                            ref={nameRef}
                            defaultValue={product && product.name}
                        />
                        <TextInput
                            placeholder="ราคาสินค้า"
                            required
                            shadow
                            type="number"
                            ref={priceRef}
                            defaultValue={product && product.price}
                        />
                        <TextInput
                            placeholder="จำนวนสินค้า"
                            required
                            shadow
                            type="number"
                            ref={stockRef}
                            defaultValue={product && product.stock}
                        />
                        <TextInput
                            placeholder="ส่วนลดสินค้า *ไม่บังคับ"
                            required
                            shadow
                            type="number"
                            ref={discountRef}
                            defaultValue={product && product.discount}
                        />
                    </div>
                    <Textarea
                        placeholder="รายละเอียดสินค้า"
                        required
                        rows={4}
                        ref={detailRef}
                        className="mb-5"
                        defaultValue={product && product.detail}
                    />
                    <div className="grid grid-cols-2 gap-5">
                        <Select className="mb-5" ref={categoryRef}>
                            <option value="">*เลือกหมวดหมู่สินค้า</option>
                            {categories &&
                                categories.map((item: categoryType) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                        </Select>
                        <Select className="mb-5" ref={brandRef}>
                            <option value="">*เลือกยี้ห้อสินค้า</option>
                            {brands &&
                                brands.map((item: brandType) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                        </Select>
                    </div>
                    <div className="flex justify-end">
                        <ButtonTable
                            text={
                                imagePreviews.length > 0
                                    ? 'บันทึก & อัพโหลดรูปภาพ'
                                    : 'บันทึก'
                            }
                            icon={CheckCircleIcon}
                            onClick={() => {
                                handleSubmit()
                            }}
                        />
                        {!productId && (
                            <ButtonTable
                                text="รีเซ็ตทั้งหมด"
                                icon={ArrowPathIcon}
                                onClick={() => {
                                    setSelectedImageUpload([])
                                    setImagePreviews([])
                                    if (nameRef.current) {
                                        nameRef.current.value = ''
                                    }
                                    if (priceRef.current) {
                                        priceRef.current.value = ''
                                    }
                                    if (stockRef.current) {
                                        stockRef.current.value = ''
                                    }
                                    if (discountRef.current) {
                                        discountRef.current.value = ''
                                    }
                                    if (detailRef.current) {
                                        detailRef.current.value = ''
                                    }
                                }}
                            />
                        )}
                        <ButtonTable
                            text="ยกเลิก"
                            icon={XCircleIcon}
                            onClick={closeBox}
                        />
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <div className="h-52 ml-5 border flex justify-center items-center shadow bg-white rounded">
                        {/* อัพโหลดรูปภาพ */}
                        <div className="max-w-md" id="fileUpload">
                            <div className="mb-2 block">
                                <Label htmlFor="file" value="อัพโหลดรูปภาพ" />
                            </div>
                            <FileInput
                                helperText="รองรับไฟล์ประเภท jpg, png เท่านั้น"
                                id="file"
                                multiple
                                onChange={handleImageUploadChange}
                            />
                        </div>
                    </div>

                    {imagePreviews.length > 0 && (
                        <div className="h-full p-5 ml-5 border-l border-r border-b flex flex-col shadow bg-white rounded mt-5">
                            <div className="flex justify-between items-center">
                                <span>{`พรีวิวรูปภาพที่เลือก ${
                                    imagePreviews.length || 0
                                } / 15`}</span>

                                <ButtonTable
                                    icon={ArrowPathIcon}
                                    text="รีเซ็ตรูปภาพ"
                                    onClick={() => {
                                        if (
                                            product &&
                                            product.image &&
                                            product.image.length > 0
                                        ) {
                                            setSelectedImageUpload([])
                                            const newImagePreview =
                                                imagePreviews.slice(
                                                    0,
                                                    product.image.length
                                                )

                                            setImagePreviews(newImagePreview)
                                        } else {
                                            setSelectedImageUpload([])
                                            setImagePreviews([])
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex flex-wrap mt-5 text-center">
                                {imagePreviews.map((preview, index) => (
                                    <div
                                        key={index}
                                        className="w-[100px] h-auto m-1"
                                    >
                                        {product &&
                                        product.image.length > index ? (
                                            <div
                                                className="h-8 flex items-center justify-center bg-red-100 cursor-pointer"
                                                onClick={() => {
                                                    if (product) {
                                                        Swal.fire({
                                                            title: 'คุณแน่ใจไหม?',
                                                            text: 'ระบบกำลังจะลบข้อมูลที่คุณเลือกและไม่สามารถกู้คืนได้ แน่ใจหรือไม่?',
                                                            icon: 'warning',
                                                            showCancelButton:
                                                                true,
                                                            cancelButtonText:
                                                                'ยกเลิก',
                                                            confirmButtonText:
                                                                'ตกลง',
                                                        }).then((result) => {
                                                            if (
                                                                result.isConfirmed
                                                            ) {
                                                                handleImageDelete(
                                                                    product &&
                                                                        product.id,
                                                                    product &&
                                                                        product
                                                                            .image[
                                                                            index
                                                                        ],
                                                                    index
                                                                )
                                                            }
                                                        })
                                                    }
                                                }}
                                            >
                                                ลบรูปภาพ
                                            </div>
                                        ) : (
                                            <div className="h-8 flex items-center justify-center bg-green-100">
                                                รอการอัพโหลด
                                            </div>
                                        )}
                                        <img
                                            src={preview}
                                            alt={`Preview ${index}`}
                                            className="w-full h-[100px] object-cover"
                                        />

                                        {product &&
                                        product.image.length > index ? (
                                            <span className="break-words">
                                                {product &&
                                                    product.image[index]}
                                            </span>
                                        ) : (
                                            <span>
                                                {selectedImageUpload[
                                                    index -
                                                        (product?.image
                                                            ?.length || 0)
                                                ].size / 1000}
                                                kb
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {imagePreviews.length == 0 && (
                        <div className="h-full ml-5 flex border-l border-r border-b rounded mt-5 bg-white shadow justify-center items-center">
                            รูปภาพของสินค้าจะแสดงที่นี่
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
