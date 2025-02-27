import Link from 'next/link'

import { Icon, IconName } from '@components/Icon'

type Props = {
    children: string
    name: IconName
    href: string
    className?: string
}

export const MenuItemHome = ({ children, name, href, ...props }: Props) => {
    return (
        <li {...props}>
            <Link
                href={href}
                className="bg-white size-[12rem] flex items-center justify-center rounded border border-grey-400 group transition-all hover:bg-main">
                <div className="flex flex-col gap-4 items-center">
                    <Icon name={name} className="size-12 fill-primary group-hover:fill-white" />
                    <h2 className="text-sm text-grey-800 font-medium group-hover:text-white">{children}</h2>
                </div>
            </Link>
        </li>
    )
}
