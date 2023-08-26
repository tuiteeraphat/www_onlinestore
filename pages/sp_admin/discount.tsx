import  {checkAuthAdmin}  from '@/utils/auth'
import { titleName } from '@/utils/constants'
import Head from 'next/head'

export default function Discount() {
    checkAuthAdmin()
    return (
        <>
            <Head>
                <title>{`${titleName} - จัดการโค๊ดส่วนลด`}</title>
            </Head>
            <div className="flex items-center justify-center h-screen">
                DiscountPage
            </div>
        </>
    )
}
