'use client'

import { Grid, QuerySearchBar, useQueryParams } from '@digico/ui'

import { useReadTransactions } from '@billing/transaction/hooks/queries/useReadTransactions'

import { MenuInvoice } from '@billing/invoice/components/MenuInvoice'
import { ExpenseTable } from '@billing/transaction/components/molecules/ExpenseTable'
import { Paginate } from '@helpers/Paginate'

export default function Page() {
    const { data } = useReadTransactions({
        page: 1,
        expenseOnly: true,
        ...useQueryParams()
    })

    return (
        <Grid>
            <Grid.Col>
                <div className="flex justify-between gap-12">
                    <MenuInvoice />
                    <div className="flex gap-2 flex-shrink-0">
                        <QuerySearchBar />
                    </div>
                </div>
            </Grid.Col>
            <Grid.Col>
                <ExpenseTable items={data?.data ?? []} />
                <Paginate className="mt-12" paginate={data?.meta} />
            </Grid.Col>
        </Grid>
    )
}
