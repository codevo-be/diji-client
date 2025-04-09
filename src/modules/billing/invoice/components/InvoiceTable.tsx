'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { INVOICE_STATUSES } from '@billing/invoice/data/invoice-statuses'
import { SimpleSelect, Table, Tag } from '@digico/ui'
import { formatCurrency } from '@digico/utils'
import clsx from 'clsx'

import { InvoiceType } from '@billing/invoice/types/invoice'

import { useRouteTenant } from 'helpers/route-tenant'

type Props = {
    items: InvoiceType[]
}

export const InvoiceTable = ({ items }: Props) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const routeWithTenant = useRouteTenant()

    const toSingle = (invoice: InvoiceType) => {
        routeWithTenant.push(`/billing/invoice/${invoice.id}`)
    }

    const onChangeStatus = ({ value }: { label: string; value: string | number }) => {
        const params = new URLSearchParams(searchParams)
        params.delete('search')
        params.append('status', String(value))
        router.push(`?${params.toString()}`)
    }

    return (
        <Table onClick={toSingle} items={items}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Client</Table.Head>
            <Table.Head>Date</Table.Head>
            <Table.Head>Sous-total</Table.Head>
            <Table.Head>
                Total (
                {formatCurrency(
                    items.reduce((current, item) => {
                        return current + (item.total ?? 0)
                    }, 0)
                )}
                )
            </Table.Head>
            <Table.Head>
                <SimpleSelect onChange={onChangeStatus} name="status" options={Object.values(INVOICE_STATUSES)} />
            </Table.Head>

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
            <Table.Col>
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
