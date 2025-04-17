'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { ESTIMATE_STATUSES } from '@billing/estimate/data/estimate-statuses'
import { Table, Tag, useQueryParams } from '@digico/ui'
import { DateHelper, formatCurrency } from '@digico/utils'
import clsx from 'clsx'
import { months } from 'data/date'

import { EstimateType } from '@billing/estimate/types/estimate'

import { SimpleSelect } from '@helpers/SimpleSelect'
import { useRouteTenant } from 'helpers/route-tenant'

type Props = {
    items: EstimateType[]
}

export const EstimateTable = ({ items }: Props) => {
    const searchParams = useSearchParams()
    const params = useQueryParams()
    const router = useRouter()
    const routeWithTenant = useRouteTenant()

    const toSingle = (estimate: EstimateType) => {
        routeWithTenant.push(`/billing/estimate/${estimate.id}`)
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

    const onChangeDate = (data: { label: string; value: string | number } | null) => {
        const params = new URLSearchParams(searchParams)

        if (!data) {
            params.delete('month')
        } else {
            params.delete('search')
            params.set('month', String(data.value))
        }

        router.push(`?${params.toString()}`)
    }

    return (
        <Table onClick={toSingle} items={items}>
            <Table.Head>ID</Table.Head>
            <Table.Head>Client</Table.Head>
            <Table.Head>Adresse</Table.Head>
            <Table.Head>
                <SimpleSelect onChange={onChangeDate} placeholder="Mois" options={months} defaultValue={Number(params.month)} />
            </Table.Head>

            <Table.Head>Sous-total</Table.Head>
            <Table.Head>
                <SimpleSelect onChange={onChangeStatus} placeholder="Statut du devis" defaultValue={params.status} options={Object.values(ESTIMATE_STATUSES)} />
            </Table.Head>

            <Table.Col name="identifier" />
            <Table.Col name="recipient.name" />
            <Table.Col>
                {(estimate: EstimateType) => {
                    if (!estimate.recipient) {
                        return ''
                    }
                    return `${estimate.recipient?.street} ${estimate.recipient?.street_number} ${estimate.recipient?.city} ${estimate.recipient?.zipcode} ${estimate.recipient?.country}`
                }}
            </Table.Col>
            <Table.Col>
                {(estimate: EstimateType) => {
                    return DateHelper.format(estimate.date)
                }}
            </Table.Col>
            <Table.Col>
                {(estimate: EstimateType) => {
                    return formatCurrency(estimate.subtotal ?? 0)
                }}
            </Table.Col>
            <Table.Col className="flex">
                {(estimate: EstimateType) => {
                    const status = ESTIMATE_STATUSES[estimate.status]

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
