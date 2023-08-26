import { titleName } from '@/utils/constants'
import Head from 'next/head'

export default function Favorite() {
    return (
        <>
            <Head>
                <title>{`${titleName} - สินค้ารายการโปรด `}</title>
            </Head>
            <div className="flex items-center justify-center h-screen">
                FavoritePage
            </div>
        </>
    )
}
