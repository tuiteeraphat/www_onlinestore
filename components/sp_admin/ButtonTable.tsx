interface ButtonTableProps {
    icon?: any
    text?: string
    onClick?: () => void
    className?: string
}

export default function ButtonTable({
    icon: Icon,
    text,
    onClick,
    className,
}: ButtonTableProps) {
    return (
        <button
            type="button"
            className={`flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-md  text-sm px-5 py-2.5 mr-2 mb-2 ${className}`}
            onClick={onClick}
        >
            <Icon className="h-5 sm:mr-2" />{' '}
            <span className="hidden sm:block">{text}</span>
        </button>
    )
}
