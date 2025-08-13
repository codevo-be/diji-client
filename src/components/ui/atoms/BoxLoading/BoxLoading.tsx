import { Spinner } from '@ui/atoms/Spinner'
import clsx from 'clsx'

type Props = {
    className?: string
}

export const BoxLoading = ({ className }: Props) => {
    return (
        <div className={clsx('rounded p-12 bg-white w-full h-full animate-pulse flex items-center justify-center', className)}>
            <Spinner className="text-main size-10 before:border-3" />
        </div>
    )
}
