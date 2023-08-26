import { titleName } from '@/utils/constants'
import Head from 'next/head'

export default function PrivacyPolicy() {
    return (
        <>
            <Head>
                <title>{`${titleName} - นโยบายความเป็นส่วนตัว`}</title>
            </Head>
            <div className="flex items-center justify-center h-screen">
                PrivacyPolicyPage
            </div>
        </>
    )
}
