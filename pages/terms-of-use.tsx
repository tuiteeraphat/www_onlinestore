import { titleName } from '@/utils/constants'
import Head from 'next/head'

export default function TermsOfUse() {
    return (
        <>
            <Head>
                <title>{`${titleName} - ข้อกำหนดการใช้งาน`}</title>
            </Head>
            <div className="flex items-center justify-center h-screen">
                TermsOfUsePage
            </div>
        </>
    )
}
