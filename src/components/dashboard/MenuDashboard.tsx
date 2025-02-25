'use client'

import { getModules } from 'helpers/module'

import { ButtonLogout } from 'components/auth/ButtonLogout'

import { MenuItemDashboard } from './MenuItemDashboard'

export const MenuDashboard = () => {
    return (
        <div className="w-auto bg-main py-8 px-2">
            <ul className="h-full flex flex-col items-center">
                <MenuItemDashboard name="app" href="/" />

                {getModules().map((module) => {
                    return <MenuItemDashboard key={module.name} name={module.name as any} href={`/gvt/${module.href}`} />
                })}

                <li className="mt-auto">
                    <ButtonLogout />
                </li>
            </ul>
        </div>
    )
}
