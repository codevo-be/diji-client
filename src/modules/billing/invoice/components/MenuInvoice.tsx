import { Menu } from '@digico/ui'

import { useRouteTenant } from 'helpers/route-tenant'

export const MenuInvoice = () => {
    const routeTenant = useRouteTenant()
    return (
        <Menu>
            <Menu.Item href={routeTenant.get('/billing/invoice')}>Factures</Menu.Item>
            <Menu.Item href={routeTenant.get('/billing/credit-note')}>Notes de crédits</Menu.Item>
            <Menu.Item href={routeTenant.get('/billing/self-invoice')}>Autofacturations</Menu.Item>
            <Menu.Item href={routeTenant.get('/billing/recurring-invoice')}>Factures récurrentes</Menu.Item>
            <Menu.Item href={routeTenant.get('/billing/batch')}>Traitement des documents</Menu.Item>
        </Menu>
    )
}
