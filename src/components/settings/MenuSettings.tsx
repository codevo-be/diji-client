import { Menu } from '@digico/ui'

import { useRouteTenant } from 'helpers/route-tenant'

export const MenuSettings = () => {
    const routeTenant = useRouteTenant()
    return (
        <Menu>
            <Menu.Item href={routeTenant.get('/settings')}>Compte</Menu.Item>
            <Menu.Item href={routeTenant.get('/settings/email')}>Email</Menu.Item>
            <Menu.Item href={routeTenant.get('/settings/billing')}>Finance</Menu.Item>
            <Menu.Item href={routeTenant.get('/settings/contact')}>Contact</Menu.Item>
        </Menu>
    )
}
