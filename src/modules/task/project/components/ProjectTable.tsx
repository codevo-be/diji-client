'use client'

import { Button, Table } from '@digico/ui'
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
        <Table items={items} onClick={toSingle}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Nom</Table.Head>
            <Table.Head>Description</Table.Head>
            <Table.Head>Liste des tâches</Table.Head>

            <Table.Col name="id" />
            <Table.Col name="name" />
            <Table.Col name="description" />
            <Table.Col>
                {(item) => (
                    <Button
                        onClick={(e) => {
                            e.stopPropagation(); // <- empêche le clic ligne
                            routeWithTenant.push(`/project/${item.id}/list`);
                        }}
                        intent="default"
                    >
                        Liste des tâches
                    </Button>
                )}
            </Table.Col>
        </Table>
    )
}
