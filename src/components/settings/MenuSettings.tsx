import { Menu } from '@digico/ui'

import { useRouteTenant } from 'helpers/route-tenant'

export const MenuSettings = () => {
    const routeTenant = useRouteTenant()
    return (
        <Menu>
            <Menu.Item href={routeTenant.get('/settings/billing')}>Finances</Menu.Item>
        </Menu>
    )
}
