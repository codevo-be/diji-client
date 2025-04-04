'use client'

import { getTenantUrl } from '@digico/utils'

import { MenuItemHome } from './MenuItemHome'

export const MenuHome = () => {
    return (
        <ul className="h-screen flex flex-wrap gap-12 items-center justify-center">
            <MenuItemHome name={'contact'} href={getTenantUrl('/contact')}>
                Contacts
            </MenuItemHome>

            <MenuItemHome name={'billing'} href={getTenantUrl('/billing/invoice')}>
                Finances
            </MenuItemHome>

            <MenuItemHome name={'task'} href={getTenantUrl('/task')}>
                Tâches
            </MenuItemHome>
        </ul>
    )
}
