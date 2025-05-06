'use client'

import { useRouter } from 'next/navigation'

import { Table } from '@digico/ui'
import { DateHelper, formatCurrency } from '@digico/utils'

import { ContactType } from '@contact/types/contact'

import { useAuth } from 'helpers/auth-context/useAuth'

type Props = {
    items: ContactType[]
}

export const ExpenseTable = ({ items }: Props) => {
    const router = useRouter()
    const { tenant } = useAuth()

    const toSingle = (contact: ContactType) => {
        router.push(`/${tenant.id}/expense/${contact.id}`)
    }

    return (
        <Table onClick={toSingle} items={items}>
            <Table.Head>Identifiant</Table.Head>
            <Table.Head>Fournisseur</Table.Head>
            <Table.Head>Date d’émission</Table.Head>
            <Table.Head>Échéance</Table.Head>
            <Table.Head>Montant</Table.Head>
            <Table.Head>Type</Table.Head>

            <Table.Col name="document_identifier" />
            <Table.Col name="sender.name" />
            <Table.Col>
                {(expense: any) => {
                    return DateHelper.format(expense.issue_date)
                }}
            </Table.Col>
            <Table.Col>
                {(expense: any) => {
                    return expense.due_date ? DateHelper.format(expense.due_date) : '/'
                }}
            </Table.Col>
            <Table.Col>
                {(expense: any) => {
                    return formatCurrency(expense.total ?? 0)
                }}
            </Table.Col>
            <Table.Col name="document_type" />
        </Table>
    )
}
