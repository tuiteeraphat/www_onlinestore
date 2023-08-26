import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { durationShowNotification, titleName } from '@/utils/constants'
import Notification from '@/components/Notification'
import Button from '@/components/Button'
import { customAxios } from '@/utils/customHook'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

export default function Login() {
    const auth = Cookies.get('auth')
    const router = useRouter()
    const emailRef = useRef('')
    const passwordRef = useRef('')

    const [showPassword, setShowPassword] = useState(false)
    const [notification, setNotification] = useState<{
        type: 'success' | 'warning' | 'error'
        message: string
    } | null>()

    useEffect(() => {
        if (auth) {
            router.push('/sp_admin')
        }
    }, [])

    const validateForm = async () => {
        const email = emailRef.current
        const password = passwordRef.current

        if (!email || !password) {
            createNotification(
                'warning',
                'คุณยังไม่ได้กรอกข้อมูล กรุณากรอกข้อมูลให้ครบถ้วน'
            )
            return
        }

        if (!email.includes('@')) {
            createNotification(
                'warning',
                'รูปแบบอีเมลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง'
            )
            return
        }

        try {
            const response = await customAxios.post('/api/signin', {
                email,
                password,
            })
            createNotification('success', response.data.message)
            Cookies.set('auth', JSON.stringify(response.data.data), {
                expires: 7,
            })
            router.reload()
        } catch (error: any) {
            createNotification('error', error.response.data.error.message)
        }
    }

    const createNotification = (type: any, message: string) => {
        setNotification({ type, message })

        setTimeout(() => {
            setNotification(null)
        }, durationShowNotification)
    }

    return (
        <>
            <Head>
                <title>{`${titleName} - เข้าสู่ระบบหลังบ้าน`}</title>
            </Head>

            <div className="flex items-center justify-center h-screen">
                <div className="p-5 sm:p-10 bg-white border rounded-xl shadow-sm flex flex-col justify-around items-center">
                    <Image
                        src="/images/logo-black.png"
                        width="150"
                        height="150"
                        alt="logo-black"
                        priority={true}
                    />

                    <span className="font-bold text-xl text-center mb-8">
                        คุณต้องยืนยันตัวตนก่อนที่จะดำเนินการต่อ
                    </span>

                    {notification && (
                        <Notification
                            type={notification.type}
                            message={notification.message}
                        />
                    )}

                    <div>
                        <div className="mb-3">
                            <label htmlFor="email" className="block mb-1">
                                อีเมล
                            </label>
                            <input
                                name="email"
                                type="text"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) =>
                                    (emailRef.current = e.target.value)
                                }
                                autoFocus
                            />
                        </div>
                        <div className="relative mb-3">
                            <label htmlFor="password" className="block mb-1">
                                รหัสผ่าน
                            </label>
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChange={(e) =>
                                    (passwordRef.current = e.target.value)
                                }
                            />
                            <button
                                className="absolute right-3 top-10 cursor-pointer"
                                onClick={() => {
                                    setShowPassword(!showPassword)
                                }}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5" />
                                ) : (
                                    <EyeIcon className="h-5" />
                                )}
                            </button>
                        </div>
                        <Button
                            classStyle="w-60 sm:w-96 bg-mainMenuBg focus:ring-gray-500"
                            text="เข้าสู่ระบบ"
                            onClick={() => {
                                validateForm()
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
