'use client'

import { Table } from '@digico/ui'

import { ContactType } from '@contact/types/contact'

import { useRouteTenant } from 'helpers/route-tenant'

type Props = {
    items: ContactType[]
}

export const ContactTable = ({ items }: Props) => {
    const routerTenant = useRouteTenant()

    const toSingle = (contact: ContactType) => {
        routerTenant.push(`/contact/${contact.id}`)
    }

    return (
        <Table onClick={toSingle} items={items}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Nom</Table.Head>
            <Table.Head>Numéro de tva</Table.Head>
            <Table.Head>Adresse email</Table.Head>
            <Table.Head>Numéro de téléphone</Table.Head>
            <Table.Col name="id" />
            <Table.Col name="display_name" />
            <Table.Col name="vat_number" />
            <Table.Col name="email" />
            <Table.Col name="phone" />
        </Table>
    )
}
