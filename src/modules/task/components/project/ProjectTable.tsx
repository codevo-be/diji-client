'use client'

import { Table } from '@digico/ui'
import { useRouterWithTenant } from '@digico/utils'

import { ContactType } from '@contact/types/contact'

type Props = {
    items: ContactType[]
}

export const ProjectTable = ({ items }: Props) => {
    const routeWithTenant = useRouterWithTenant()

    const toSingle = (contact: ContactType) => {
        routeWithTenant.push(`/project/${contact.id}`)
    }

    return (
        <Table onClick={toSingle} items={items}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Nom</Table.Head>
            <Table.Head>Description</Table.Head>
            <Table.Col name="id" />
            <Table.Col name="name" />
            <Table.Col name="description" />
        </Table>
    )
}
