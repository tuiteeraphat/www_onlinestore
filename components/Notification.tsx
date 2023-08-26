import React, { useState, useEffect } from 'react'
import { XCircleIcon } from '@heroicons/react/24/solid'

type NotificationProps = {
    type: 'success' | 'warning' | 'error'
    message: string
}

const Notification: React.FC<NotificationProps> = ({ type, message }) => {
    const backgroundColor =
        type === 'success'
            ? 'bg-green-500'
            : type === 'warning'
            ? 'bg-yellow-500'
            : 'bg-red-500'
    const textColor =
        type === 'success'
            ? 'text-green-50'
            : type === 'warning'
            ? 'text-yellow-50'
            : 'text-red-50'

    return (
        <div
            className={`${backgroundColor} w-full text-center p-4 my-5 rounded-md shadow-md`}
        >
            <span className={`${textColor} font-semibold`}>{message}</span>
        </div>
    )
}

export default Notification
