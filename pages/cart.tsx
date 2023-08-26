import { titleName } from '@/utils/constants'
import Head from 'next/head'

export default function Cart() {
    return (
        <>
            <Head>
                <title>{`${titleName} - ตระกร้าสินค้าของฉัน`}</title>
            </Head>
            <div className="flex items-center justify-center h-screen">
                CartPage
            </div>
        </>
    )
}
