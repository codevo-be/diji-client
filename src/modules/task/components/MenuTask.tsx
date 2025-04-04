'use client'

import { useParams } from 'next/navigation'

import { Menu } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

export const MenuTask = () => {
    const { id } = useParams()

    return (
        <Menu>
            <Menu.Item href={getTenantUrl(`/project/${id}/kanban`)}>Kanban</Menu.Item>
            <Menu.Item href={getTenantUrl(`/project/${id}/list`)}>Liste</Menu.Item>
        </Menu>
    )
}
