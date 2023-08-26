import { titleName } from '@/utils/constants'
import Head from 'next/head'

export default function Contact() {
    return (
        <>
            <Head>
                <title>{`${titleName} - ติดต่อเรา`}</title>
            </Head>
            <div className="flex items-center justify-center h-screen">
                ContactPage
            </div>
        </>
    )
}
