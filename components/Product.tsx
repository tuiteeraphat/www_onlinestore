import ProductModel from '@/models/product'
import checkName from '@/utils/checkName'
import formatCurrency from '@/utils/formatCurrency'

export default function Product({ name, price, sold, image }: ProductModel) {
    return (
        <>
            <div className="w-44 h-56 m-1 flex flex-col items-center bg-white border shadow rounded text-start">
                {image[0] ? (
                    <img
                        src={`http://localhost:8000/uploads/${image[0]}`}
                        alt=""
                        className="h-32 w-fit"
                    />
                ) : (
                    <img
                        src={`http://localhost:8000/uploads/image-not-found.jpg`}
                        alt=""
                        className="h-32 w-full"
                    />
                )}
                <div className="w-full h-full flex flex-col justify-between">
                    <span className="my-2 px-2">{checkName(name, 35)}</span>
                    <div className="flex justify-between items-center my-2 px-2">
                        <span className="font-bold text-orange-400">
                            ฿{formatCurrency(price || 0)}
                        </span>
                        <span className="text-[13px]">ขายแล้ว {sold} ชิ้น</span>
                    </div>
                </div>
            </div>
        </>
    )
}
