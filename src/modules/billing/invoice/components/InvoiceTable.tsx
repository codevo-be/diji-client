'use client'

import { INVOICE_STATUSES } from '@billing/invoice/data/invoice-statuses'
import { Table, Tag } from '@digico/ui'
import { formatCurrency, useRouterWithTenant } from '@digico/utils'
import clsx from 'clsx'

import { InvoiceType } from '@billing/invoice/types/invoice'

type Props = {
    items: InvoiceType[]
}

export const InvoiceTable = ({ items }: Props) => {
    const routeWithTenant = useRouterWithTenant()

    const toSingle = (invoice: InvoiceType) => {
        routeWithTenant.push(`/billing/invoice/${invoice.id}`)
    }

    return (
        <Table onClick={toSingle} items={items}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Client</Table.Head>
            <Table.Head>Date</Table.Head>
            <Table.Head>Sous-total</Table.Head>
            <Table.Head>Total</Table.Head>

            <Table.Col name="identifier" />
            <Table.Col name="recipient.name" />
            <Table.Col>
                {(invoice: InvoiceType) => {
                    return invoice.date
                }}
            </Table.Col>
            <Table.Col>
                {(invoice: InvoiceType) => {
                    return formatCurrency(invoice.subtotal ?? 0)
                }}
            </Table.Col>
            <Table.Col>
                {(invoice: InvoiceType) => {
                    return formatCurrency(invoice.total ?? 0)
                }}
            </Table.Col>
            <Table.Col className="flex">
                {(invoice: InvoiceType) => {
                    const status = INVOICE_STATUSES[invoice.status]

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
