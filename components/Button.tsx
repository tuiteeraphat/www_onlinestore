interface ButtonProps {
    text?: string
    classStyle?: string
    onClick?: () => void
}

export default function Button({ onClick, classStyle, text }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`${classStyle} focus:ring-4 focus:ring-buttonRingColor rounded-xl h-12 text-buttonFontColor bg-buttonBg mt-5 text-lg`}
        >
            {text}
        </button>
    )
}
