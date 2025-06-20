import { Menu } from '@digico/ui'

import { useRouteTenant } from 'helpers/route-tenant'

export const SettingsMenu = () => {
    const { get } = useRouteTenant()
    return (
        <Menu>
            <Menu.Item href={get('/settings')}>Compte</Menu.Item>
            <Menu.Item href={get('/settings/contact')}>Import des contacts</Menu.Item>
        </Menu>
    )
}
