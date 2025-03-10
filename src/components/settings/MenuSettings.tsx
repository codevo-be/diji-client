import { Menu } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

export const MenuSettings = () => {
    return (
        <Menu>
            <Menu.Item href={getTenantUrl('/settings/billing')}>Finances</Menu.Item>
        </Menu>
    )
}
