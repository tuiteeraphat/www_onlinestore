import { titleName } from '@/utils/constants'
import Head from 'next/head'

export default function Order() {
    return (
        <>
            <Head>
                <title>{`${titleName} - คำสั่งซื้อของฉัน`}</title>
            </Head>
            <div className="flex items-center justify-center h-screen">
                OrderPage
            </div>
        </>
    )
}
