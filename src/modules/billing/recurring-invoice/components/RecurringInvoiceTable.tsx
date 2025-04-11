'use client'

import { Table, Tag } from '@digico/ui'
import { formatCurrency } from '@digico/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import clsx from 'clsx'

import { RecurringInvoiceType } from '../types/recurring-invoice'


import { useRouteTenant } from 'helpers/route-tenant'
import { SimpleSelect } from '@components/helpers/SimpleSelect'

import { RECURRING_INVOICE_STATUSES } from '../data/recurring-invoice-statuses'

type Props = {
    items: RecurringInvoiceType[]
}

export const RecurringInvoiceTable = ({ items }: Props) => {
    const routeWithTenant = useRouteTenant()
    const router = useRouter()
    const params = useQueryParams()
    const searchParams = useSearchParams()

    const toSingle = (recurring_invoice: RecurringInvoiceType) => {
        routeWithTenant.push(`/billing/recurring-invoice/${recurring_invoice.id}`)
    }

    const onChangeStatus = (data: { label: string; value: string | number } | null) => {
        const params = new URLSearchParams(searchParams)

        if (!data) {
            params.delete('status')
        } else {
            params.delete('search')
            params.set('status', String(data.value))
        }

        router.push(`?${params.toString()}`)
    }

    return (
        <Table onClick={toSingle} items={items}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Client</Table.Head>
            <Table.Head>Sous-total</Table.Head>
            <Table.Head>Total</Table.Head>
            <Table.Head>
                <SimpleSelect
                    onChange={onChangeStatus}
                    placeholder="Statut de la facture"
                    defaultValue={params.status}
                    options={Object.values(RECURRING_INVOICE_STATUSES)}
                />
            </Table.Head>

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
