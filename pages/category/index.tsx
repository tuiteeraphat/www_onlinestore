import { titleName } from '@/utils/constants'
import Head from 'next/head'

export default function Index() {
    return (
        <>
            <Head>
                <title>{titleName} - หมวดหมู่สินค้า</title>
            </Head>
            <div className="flex items-center justify-center h-screen">
                CategoryPage
            </div>
        </>
    )
}
