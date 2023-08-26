import { titleName } from '@/utils/constants'
import Head from 'next/head'

export default function Help() {
    return (
        <>
            <Head>
                <title>{`${titleName} - ช่วยเหลือ`}</title>
            </Head>
            <div className="flex items-center justify-center h-screen">
                HelpPage
            </div>
        </>
    )
}
