'use client'

import { Grid, PageHeader, QuerySearchBar, useQueryParams } from '@digico/ui'

import { useReadExpenses } from '@billing/expense/hooks/queries/useReadExpenses'

import { ExpenseTable } from '@billing/expense/components/ExpenseTable'

export default function Page() {
    const queryExpenses = useReadExpenses(useQueryParams())

    return (
        <Grid>
            <Grid.Col>
                <div className="flex justify-between">
                    <PageHeader>Dépenses</PageHeader>
                    <div className="flex gap-2 flex-shrink-0">
                        <QuerySearchBar />
                    </div>
                </div>
            </Grid.Col>
            <Grid.Col>
                <ExpenseTable items={queryExpenses.data?.data ?? []} />
            </Grid.Col>
        </Grid>
    )
}
