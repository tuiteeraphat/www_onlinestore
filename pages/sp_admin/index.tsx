import Head from 'next/head'
import { checkAuthAdmin } from '@/utils/auth'
import { titleName } from '@/utils/constants'

export default function Index() {
    checkAuthAdmin()
    return (
        <>
            <Head>
                <title>{`${titleName} - จัดการข้อมูลหลังร้าน`}</title>
            </Head>
            <div>
                <div className="flex flex-wrap">
                    <div className="border rounded shadow w-96 h-32 flex flex-col items-center justify-center m-5">
                        <span className="mb-2 font-bold">รายได้ทั้งหมด</span>
                        <span>850,606.54 บาท</span>
                    </div>
                    <div className="border rounded shadow w-96 h-32 flex flex-col items-center justify-center m-5">
                        <span className="mb-2 font-bold">ผู้ใช้งานทั้งหมด</span>
                        <span>2,500 คน</span>
                    </div>
                    <div className="border rounded shadow w-96 h-32 flex flex-col items-center justify-center m-5">
                        <span className="mb-2 font-bold">คำสั่งซื้อสำเร็จ</span>
                        <span>6,302 ออเดอร์</span>
                    </div>
                    <div className="border rounded shadow w-96 h-32 flex flex-col items-center justify-center m-5">
                        <span className="mb-2 font-bold">คำสั่งถูกยกเลิก</span>
                        <span>630 ออเดอร์</span>
                    </div>
                </div>
            </div>
        </>
    )
}
