'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { TRANSACTION_STATUSES } from '@billing/transaction/data/transaction-statuses'
import { Table, Tag, useQueryParams } from '@digico/ui'
import { DateHelper, formatCurrency } from '@digico/utils'
import { months } from 'data/date'

import { TransactionType } from '@billing/transaction/types/transaction'
import { ProjectType } from '@project/types/project'

import { SimpleSelect } from '@helpers/SimpleSelect'
import { useRouteTenant } from 'helpers/route-tenant'

type Props = {
    items: TransactionType[]
}

export const ExpenseTable = ({ items }: Props) => {
    const searchParams = useSearchParams()
    const routerTenant = useRouteTenant()
    const params = useQueryParams()
    const router = useRouter()

    const toSingle = (project: ProjectType) => {
        routerTenant.push(`/billing/expense/${project.id}`)
    }

    const onChangeDate = (data: { label: string; value: string | number } | null) => {
        const params = new URLSearchParams(searchParams)

        if (!data) {
            params.delete('month')
        } else {
            params.set('month', String(data.value))
        }

        router.push(`?${params.toString()}`)
    }

    return (
        <Table items={items} onClick={toSingle}>
            <Table.Head>
                <SimpleSelect onChange={onChangeDate} placeholder="Mois" options={months} defaultValue={Number(params.month)} />
            </Table.Head>
            <Table.Head>De</Table.Head>
            <Table.Head>À</Table.Head>
            <Table.Head>Total</Table.Head>
            <Table.Head>Statut</Table.Head>

            <Table.Col>{(item) => DateHelper.format(item.date)}</Table.Col>
            <Table.Col name="debtor_name" />
            <Table.Col name="creditor_name" />
            <Table.Col>
                {(item) => {
                    return formatCurrency(item.amount)
                }}
            </Table.Col>
            <Table.Col>
                {(item) => {
                    return (
                        //@ts-ignore
                        <Tag size={'xs'} className={`text-${TRANSACTION_STATUSES[item.status]?.color}`}>
                            {/* @ts-ignore */}
                            {TRANSACTION_STATUSES[item.status]?.label}
                        </Tag>
                    )
                }}
            </Table.Col>
        </Table>
    )
}
