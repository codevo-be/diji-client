'use client'

import { Grid, QuerySearchBar, useQueryParams } from '@digico/ui'

import { useReadSelfInvoices } from '@billing/self-invoice/hooks/queries'

import { MenuInvoice } from '@billing/invoice/components/MenuInvoice'
import { ButtonCreateSelfInvoice } from '@billing/self-invoice/components/ButtonCreateSelfInvoice'
import { SelfInvoiceTable } from '@billing/self-invoice/components/SelfInvoiceTable'
import { Paginate } from '@components/helpers/Paginate'

export default function Page() {
    const querySelfInvoices = useReadSelfInvoices(useQueryParams())

    return (
        <Grid>
            <Grid.Col>
                <div className="flex justify-between gap-12">
                    <MenuInvoice />
                    <div className="flex gap-2 flex-shrink-0">
                        <QuerySearchBar />
                        <ButtonCreateSelfInvoice />
                    </div>
                </div>
            </Grid.Col>
            <Grid.Col>
                <SelfInvoiceTable items={querySelfInvoices.data?.data ?? []} />
                <Paginate className="mt-12" paginate={querySelfInvoices.data?.meta} />
            </Grid.Col>
        </Grid>
    )
}
