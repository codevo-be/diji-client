'use client'

import { modulesClient } from 'data/modules'

import { useAuth } from 'helpers/auth-context/useAuth'
import { useRouteTenant } from 'helpers/route-tenant'

import { MenuItemHome } from './MenuItemHome'

export const MenuHome = () => {
    const { modules } = useAuth()
    const routerTenant = useRouteTenant()

    return (
        <ul className="h-screen flex flex-wrap gap-12 items-center justify-center">
            {modules.map((module) => {
                //@ts-ignore
                const moduleClient = modulesClient[module.slug]

                if (!moduleClient) {
                    return null
                }

                return (
                    <MenuItemHome key={module.id} icon={moduleClient.icon} href={routerTenant.get(moduleClient.href)}>
                        {moduleClient.name}
                    </MenuItemHome>
                )
            })}
        </ul>
    )
}
