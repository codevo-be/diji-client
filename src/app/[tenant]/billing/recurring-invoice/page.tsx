'use client'

import { Grid, QuerySearchBar, useQueryParams } from '@digico/ui'

import { useReadRecurringInvoices } from '@billing/recurring-invoice/hooks/queries'

import { MenuInvoice } from '@billing/invoice/components/MenuInvoice'
import { ButtonCreateRecurringInvoice } from '@billing/recurring-invoice/components/ButtonCreateRecurringInvoice'
import { RecurringInvoiceTable } from '@billing/recurring-invoice/components/RecurringInvoiceTable'

export default function Page() {
    const queryRecurringInvoices = useReadRecurringInvoices(useQueryParams())

    return (
        <Grid>
            <Grid.Col>
                <div className="flex justify-between">
                    <MenuInvoice />
                    <div className="flex gap-2 flex-shrink-0">
                        <QuerySearchBar />
                        <ButtonCreateRecurringInvoice />
                    </div>
                </div>
            </Grid.Col>
            <Grid.Col>
                <RecurringInvoiceTable items={queryRecurringInvoices.data?.data ?? []} />
            </Grid.Col>
        </Grid>
    )
}
