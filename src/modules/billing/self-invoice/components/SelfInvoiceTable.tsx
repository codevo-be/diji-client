'use client'

import { Table, Tag } from '@digico/ui'
import { formatCurrency, useRouterWithTenant } from '@digico/utils'
import clsx from 'clsx'

import { SelfInvoiceType } from '../types/self-invoice'

import { SELF_INVOICE_STATUSES } from '../data/self-invoice-statuses'

type Props = {
    items: SelfInvoiceType[]
}

export const SelfInvoiceTable = ({ items }: Props) => {
    const routeWithTenant = useRouterWithTenant()

    const toSingle = (self_invoice: SelfInvoiceType) => {
        routeWithTenant.push(`/billing/self-invoice/${self_invoice.id}`)
    }

    return (
        <Table onClick={toSingle} items={items}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Expéditeur</Table.Head>
            <Table.Head>Destinataire</Table.Head>
            <Table.Head>Date</Table.Head>
            <Table.Head>Sous-total</Table.Head>
            <Table.Head>Total</Table.Head>
            <Table.Head>Statut</Table.Head>
            <Table.Col name="identifier" />
            <Table.Col name="issuer.name" />
            <Table.Col name="recipient.name" />
            <Table.Col>
                {(invoice: SelfInvoiceType) => {
                    return invoice.date
                }}
            </Table.Col>
            <Table.Col>
                {(invoice: SelfInvoiceType) => {
                    return formatCurrency(invoice.subtotal ?? 0)
                }}
            </Table.Col>
            <Table.Col>
                {(invoice: SelfInvoiceType) => {
                    return formatCurrency(invoice.total ?? 0)
                }}
            </Table.Col>
            <Table.Col>
                {(invoice: SelfInvoiceType) => {
                    const status = SELF_INVOICE_STATUSES[invoice.status]

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
