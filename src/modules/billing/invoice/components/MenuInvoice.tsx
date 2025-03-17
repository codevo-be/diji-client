import { Menu } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

export const MenuInvoice = () => {
    return (
        <Menu>
            <Menu.Item href={getTenantUrl('/billing/invoice')}>Factures</Menu.Item>
            <Menu.Item href={getTenantUrl('/billing/credit-note')}>Notes de crédits</Menu.Item>
            <Menu.Item href={getTenantUrl('/billing/self-invoice')}>Autofacturations</Menu.Item>
            <Menu.Item href={getTenantUrl('/billing/batch')}>Traitement des documents</Menu.Item>
        </Menu>
    )
}
