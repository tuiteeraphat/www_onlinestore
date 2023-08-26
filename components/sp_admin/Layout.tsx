import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const auth = useSelector((state: any) => state.auth.data)
    return (
        <div className="flex">
            {auth && <Sidebar />}
            <div className={`${auth && 'ml-24'} w-full p-5`}>{children}</div>
        </div>
    )
}
