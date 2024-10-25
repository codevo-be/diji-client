import { SVGProps } from 'react'

interface Props extends SVGProps<SVGSVGElement> {
    name: string
}

export const Icon = ({ name, ...props }: Props) => {
    return (
        <svg {...props}>
            <use xlinkHref={`/sprite.svg?v=${Date.now()}#${name}`} />
        </svg>
    )
}
