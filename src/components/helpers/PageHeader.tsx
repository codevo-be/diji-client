import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { queryClient } from '@digico/utils'
import clsx from 'clsx'

type Props = {
    children: React.ReactNode
    label?: string
    href?: string
    className?: string
}

export const PageHeader = ({ children, className, label, href }: Props) => {
    const router = useRouter()

    const onBackButton = () => {
        router.back()
        queryClient.invalidateQueries()
    }

    return (
        <div className={clsx(className, 'flex flex-col items-start')}>
            {label &&
                (href ? (
                    <Link className="text-xs text-grey-600 transition-all flex items-center gap-4 group hover:text-primary" href={href}>
                        {'← '} {label}
                    </Link>
                ) : (
                    <button
                        className="text-xs text-grey-600 transition-all flex items-center gap-4 group hover:text-primary"
                        type="button"
                        onClick={onBackButton}>
                        {'← '} {label}
                    </button>
                ))}
            <h1 className="leading-tight text-md font-semibold">{children}</h1>
        </div>
    )
}
