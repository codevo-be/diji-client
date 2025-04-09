import Link from 'next/link'

import { Icon } from '@components/Icon'
import { useRouteTenant } from 'helpers/route-tenant'

export const ButtonSettings = () => {
    const routeTenant = useRouteTenant()

    return (
        <Link href={routeTenant.get('/settings')} className="inline-flex cursor-pointer text-white p-5 rounded transition-all hover:bg-white hover:text-main">
            <Icon name="settings" className="fill-current size-8" />
        </Link>
    )
}
