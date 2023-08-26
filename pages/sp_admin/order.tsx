import { checkAuthAdmin } from '@/utils/auth'
import { titleName } from '@/utils/constants'
import Head from 'next/head'

export default function Order() {
    checkAuthAdmin()
    return (
        <>
            <Head>
                <title>{`${titleName} - จัดการคำสั่งซื้อ`}</title>
            </Head>
            <div className="flex items-center justify-center h-screen">
                OrderPage
            </div>
        </>
    )
}
