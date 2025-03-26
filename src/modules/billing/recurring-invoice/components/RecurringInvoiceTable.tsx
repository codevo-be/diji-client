'use client'

import { Table, Tag } from '@digico/ui'
import { formatCurrency, useRouterWithTenant } from '@digico/utils'
import clsx from 'clsx'

import { RecurringInvoiceType } from '../types/recurring-invoice'

import { RECURRING_INVOICE_STATUSES } from '../data/recurring-invoice-statuses'

type Props = {
    items: RecurringInvoiceType[]
}

export const RecurringInvoiceTable = ({ items }: Props) => {
    const routeWithTenant = useRouterWithTenant()

    const toSingle = (recurring_invoice: RecurringInvoiceType) => {
        routeWithTenant.push(`/billing/recurring-invoice/${recurring_invoice.id}`)
    }

    return (
        <Table onClick={toSingle} items={items}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Client</Table.Head>
            <Table.Head>Sous-total</Table.Head>
            <Table.Head>Total</Table.Head>

            <Table.Col name="identifier" />
            <Table.Col name="recipient.name" />
            <Table.Col>
                {(invoice: RecurringInvoiceType) => {
                    return formatCurrency(invoice.subtotal ?? 0)
                }}
            </Table.Col>
            <Table.Col>
                {(invoice: RecurringInvoiceType) => {
                    return formatCurrency(invoice.total ?? 0)
                }}
            </Table.Col>
            <Table.Col>
                {(invoice: RecurringInvoiceType) => {
                    const status = RECURRING_INVOICE_STATUSES[invoice.status]

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
