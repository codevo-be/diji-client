import Link from 'next/link'

import clsx from 'clsx'

import { Icon, IconName } from 'components/Icon'

type Props = {
    icon: IconName
    href: string
    className?: string
}

export const MenuItemSidebar = ({ icon, className, ...props }: Props) => {
    return (
        <li>
            <Link className={clsx('text-white flex p-5 rounded transition-all hover:bg-white hover:text-main', className)} {...props}>
                <Icon className="size-7 fill-current" name={icon} />
            </Link>
        </li>
    )
}
