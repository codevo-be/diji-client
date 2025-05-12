'use client'

import { modulesClient } from 'data/modules'

import { ButtonLogout } from '@components/auth/ButtonLogout'
import { MenuItemSidebar } from '@components/dashboard/sidebar/MenuItemSidebar'
import { useAuth } from 'helpers/auth-context/useAuth'
import { useRouteTenant } from 'helpers/route-tenant'

import { ButtonSettings } from './ButtonSettings'

export const MenuSidebar = () => {
    const { modules = [] } = useAuth()
    const routerTenant = useRouteTenant()

    // Afficher la liste des modules
    console.log("Modules : ", modules)

    return (
        <div className="w-auto bg-main py-8 px-2">
            <ul className="h-full flex flex-col items-center">
                <MenuItemSidebar icon="app" href={routerTenant.get('/')} />

                {modules.map((module) => {
                    //@ts-ignore
                    const moduleClient = modulesClient[module.slug]

                    if (!moduleClient) {
                        return null
                    }

                    return <MenuItemSidebar key={module.id} icon={moduleClient.icon} href={routerTenant.get(moduleClient.href)} />
                })}

                <li className="mt-auto flex flex-col">
                    <ButtonSettings />
                    <ButtonLogout />
                </li>
            </ul>
        </div>
    )
}
