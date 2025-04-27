'use client'

import { Table } from '@digico/ui'

import { ProjectType } from '@project/types/project'

import { useRouteTenant } from 'helpers/route-tenant'

type Props = {
    items: ProjectType[]
}

export const ProjectTable = ({ items }: Props) => {
    const routerTenant = useRouteTenant()

    const toSingle = (project: ProjectType) => {
        routerTenant.push(`/project/${project.id}`)
    }

    return (
        <Table items={items} onClick={toSingle}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Nom</Table.Head>

            <Table.Col name="id" />
            <Table.Col name="name" />
        </Table>
    )
}
