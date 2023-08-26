import { titleName } from '@/utils/constants'
import Head from 'next/head'

export default function About() {
    return (
        <>
            <Head>
                <title>{`${titleName} - เกี่ยวกับเรา`}</title>
            </Head>
            <div className="flex items-center justify-center h-screen">
                AboutPage
            </div>
        </>
    )
}
