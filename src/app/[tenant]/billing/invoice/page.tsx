'use client'

import { Grid, QuerySearchBar, useQueryParams } from '@digico/ui'

import { useReadInvoices } from '@billing/invoice/hooks/queries'

import { ButtonCreateInvoice } from '@billing/invoice/components/ButtonCreateInvoice'
import { InvoiceTable } from '@billing/invoice/components/InvoiceTable'
import { MenuInvoice } from '@billing/invoice/components/MenuInvoice'
import { Paginate } from '@helpers/Paginate'

export default function Page() {
    const queryInvoices = useReadInvoices(useQueryParams())

    return (
        <Grid>
            <Grid.Col>
                <div className="flex justify-between gap-12">
                    <MenuInvoice />
                    <div className="flex gap-2 flex-shrink-0">
                        <QuerySearchBar />
                        <ButtonCreateInvoice />
                    </div>
                </div>
            </Grid.Col>
            {queryInvoices.data && (
                <Grid.Col>
                    <InvoiceTable items={queryInvoices.data.data ?? []} />
                    <Paginate className="mt-12" paginate={queryInvoices.data.meta} />
                </Grid.Col>
            )}
        </Grid>
    )
}
