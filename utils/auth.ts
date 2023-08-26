import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import router, { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setAuth } from '@/store/slice/authSlice'

export const checkAuthAdmin = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [authCookie, setAuthCookie] = useState(Cookies.get('auth'))

    useEffect(() => {
        const handleAuthChange = () => {
            const newAuthCookie = Cookies.get('auth')
            if (newAuthCookie !== authCookie) {
                setAuthCookie(newAuthCookie)
                router.reload()
            }
        }

        const interval = setInterval(handleAuthChange, 1000)

        return () => clearInterval(interval)
    }, [authCookie, router])

    useEffect(() => {
        if (!authCookie) {
            router.push('/sp_admin/login')
        } else {
            dispatch(setAuth(JSON.parse(authCookie)))
        }
    }, [])
}

export const checkAuthCustomer = () => {
    const dispatch = useDispatch()
    const [authCookie, setAuthCookie] = useState(Cookies.get('auth'))

    useEffect(() => {
        const handleAuthChange = () => {
            const newAuthCookie = Cookies.get('auth')
            if (newAuthCookie !== authCookie) {
                setAuthCookie(newAuthCookie)
                router.reload()
            }
        }

        const interval = setInterval(handleAuthChange, 1000)

        return () => clearInterval(interval)
    }, [authCookie, router])

    useEffect(() => {
        if (authCookie) {
            dispatch(setAuth(JSON.parse(authCookie)))
        }
    }, [])
}
