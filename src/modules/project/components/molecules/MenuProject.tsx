'use client'

import { useParams } from 'next/navigation'

import { Menu } from '@digico/ui'

import { useRouteTenant } from 'helpers/route-tenant'

export const MenuProject = () => {
    const routeTenant = useRouteTenant()

    const { id } = useParams()

    return (
        <Menu>
            <Menu.Item href={routeTenant.get('/project')}>← Retour</Menu.Item>
            <Menu.Item href={routeTenant.get(`/project/${id}`)}>Projet</Menu.Item>
            <Menu.Item href={routeTenant.get(`/project/${id}/task`)}>Tâches</Menu.Item>
        </Menu>
    )
}
