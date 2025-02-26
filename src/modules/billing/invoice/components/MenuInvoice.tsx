import { Menu } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

export const MenuInvoice = () => {
    return (
        <Menu>
            <Menu.Item href={getTenantUrl('/billing/invoice')}>Factures</Menu.Item>
        </Menu>
    )
}
