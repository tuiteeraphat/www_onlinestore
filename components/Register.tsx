import React, { useState } from 'react'
import Button from './Button'
import { EyeIcon, EyeSlashIcon, XCircleIcon } from '@heroicons/react/24/solid'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
}

const Register: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <>
            {/* <Head>
                <title>Sitepow - เข้าสู่ระบบ</title>
            </Head> */}
            {/* {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )} */}
            <div className="p-5 sm:p-10 rounded-lg absolute right-0 border-t bg-mainMenuBg backdrop-blur-md text-mainMenuFontColor shadow-sm flex flex-col justify-around items-center">
                {/* <span className="font-bold text-xl text-center mb-5">
                    คุณต้องเข้าสู่ระบบเพื่อดำเนินการต่อ
                </span> */}

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
                            // onChange={(e) => emailRef.current = e.target.value}
                            autoFocus
                        />
                    </div>
                    <div className="relative mb-3">
                        <label htmlFor="password" className="block mb-1">
                            รหัสผ่าน (มากกว่า 6 ตัว)
                        </label>
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            // onChange={(e) => passwordRef.current = e.target.value}
                        />
                        <button
                            className="absolute right-3 top-10 cursor-pointer"
                            onClick={() => {
                                setShowPassword(!showPassword)
                            }}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 text-black" />
                            ) : (
                                <EyeIcon className="h-5 text-black" />
                            )}
                        </button>
                    </div>
                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block mb-1">
                            ยืนยันรหัสผ่าน
                        </label>
                        <input
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            // onChange={(e) =>
                            //     (confirmPasswordRef.current = e.target.value)
                            // }
                        />
                        <button
                            className="absolute right-3 top-10 cursor-pointer"
                            onClick={() => {
                                setShowConfirmPassword(!showConfirmPassword)
                            }}
                        >
                            {showConfirmPassword ? (
                                <EyeSlashIcon className="h-5 text-black" />
                            ) : (
                                <EyeIcon className="h-5 text-black" />
                            )}
                        </button>
                    </div>
                    {/* <div
                        className={`flex justify-end my-3  hover:underline cursor-pointer text-buttonBg`}
                    >
                        ลืมรหัสผ่าน?
                    </div> */}
                    <Button
                        classStyle="w-52 mt-8"
                        text="สมัครสมาชิก"
                        onClick={() => {}}
                    />
                </div>

                <div
                    className="cursor-pointer flex items-center mt-8"
                    onClick={onClose}
                >
                    <XCircleIcon className="h-5 mr-1" />
                    ปิดหน้าต่างนี้
                </div>

                {/* <div className="mt-5">
                    <span>ยังไม่มีบัญชีใช่ไหม?</span>
                    <span className="ml-3 hover:underline cursor-pointer">
                        <Link href={headerMenu.registerUrl}>สมัครสมาชิก</Link>
                    </span>
                </div> */}
            </div>
        </>
    )
}

export default Register
