import { Menu } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

export const MenuInvoice = () => {
    return (
        <Menu>
            <Menu.Item href={getTenantUrl('/billing/invoice')}>Factures</Menu.Item>
            <Menu.Item href={getTenantUrl('/billing/credit-note')}>Notes de crédit</Menu.Item>
            <Menu.Item href={getTenantUrl('/billing/self-invoice')}>Autofacturation</Menu.Item>
        </Menu>
    )
}
