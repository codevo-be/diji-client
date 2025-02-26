'use client'

import { getTenantUrl } from '@digico/utils'

import { ButtonLogout } from 'components/auth/ButtonLogout'

import { MenuItemDashboard } from './MenuItemDashboard'

export const MenuDashboard = () => {
    return (
        <div className="w-auto bg-main py-8 px-2">
            <ul className="h-full flex flex-col items-center">
                <MenuItemDashboard name="app" href="/" />

                <MenuItemDashboard name={'contact'} href={getTenantUrl('/contact')} />

                <MenuItemDashboard name={'billing'} href={getTenantUrl('/billing/invoice')} />

                <li className="mt-auto">
                    <ButtonLogout />
                </li>
            </ul>
        </div>
    )
}
