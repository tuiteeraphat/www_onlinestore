import { titleName } from '@/utils/constants'
import Head from 'next/head'

export default function Discount() {
    return (
        <>
            <Head>
                <title>{`${titleName} - โค้ดลดราคา`}</title>
            </Head>
            <div className="flex items-center justify-center h-screen">
                DiscountPage
            </div>
        </>
    )
}
