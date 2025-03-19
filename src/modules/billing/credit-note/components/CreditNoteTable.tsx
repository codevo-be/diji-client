'use client'

import { Table, Tag } from '@digico/ui'
import { formatCurrency, useRouterWithTenant } from '@digico/utils'
import clsx from 'clsx'

import { CreditNoteType } from '../types/credit-note'

import { CREDIT_NOTE_STATUSES } from '../data/credit-note-statuses'

type Props = {
    items: CreditNoteType[]
}

export const CreditNoteTable = ({ items }: Props) => {
    const routeWithTenant = useRouterWithTenant()

    const toSingle = (credit_note: CreditNoteType) => {
        routeWithTenant.push(`/billing/credit-note/${credit_note.id}`)
    }

    return (
        <Table onClick={toSingle} items={items}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Client</Table.Head>
            <Table.Head>Date</Table.Head>
            <Table.Head>Sous-total</Table.Head>
            <Table.Head>Total</Table.Head>
            <Table.Head>Statut</Table.Head>
            <Table.Col name="identifier" />
            <Table.Col name="recipient.name" />
            <Table.Col>
                {(credit_note: CreditNoteType) => {
                    return credit_note.date
                }}
            </Table.Col>
            <Table.Col>
                {(credit_note: CreditNoteType) => {
                    return formatCurrency(credit_note.subtotal ?? 0)
                }}
            </Table.Col>
            <Table.Col>
                {(credit_note: CreditNoteType) => {
                    return formatCurrency(credit_note.total ?? 0)
                }}
            </Table.Col>
            <Table.Col>
                {(credit_note: CreditNoteType) => {
                    const status = CREDIT_NOTE_STATUSES[credit_note.status]

                    return (
                        <Tag className={clsx(`text-${status.color}`)} size={'xs'}>
                            {status.label}
                        </Tag>
                    )
                }}
            </Table.Col>
        </Table>
    )
}
