import clsx from 'clsx'

type Props = {
    className?: string
}
export const Spinner = ({ className }: Props) => {
    return (
        <div
            className={clsx(
                'size-6 pointer-events-none border-current inline-block relative before:block before:absolute before:w-full before:h-full before:rounded-full before:border-solid before:border-2 before:border-t-current before:border-r-current before:border-b-transparent before:border-l-transparent before:animate-spin',
                className
            )}></div>
    )
}
