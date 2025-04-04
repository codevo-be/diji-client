'use client'

import { Grid, QuerySearchBar, useQueryParams } from '@digico/ui'

import { useReadCreditNotes } from '@billing/credit-note/hooks/queries'

import { BoxStats } from '@billing/credit-note/components/BoxStats'
import { ButtonCreateCreditNote } from '@billing/credit-note/components/ButtonCreateCreditNote'
import { CreditNoteTable } from '@billing/credit-note/components/CreditNoteTable'
import { MenuInvoice } from '@billing/invoice/components/MenuInvoice'
import { Paginate } from '@components/helpers/Paginate'

export default function Page() {
    const queryCreditNotes = useReadCreditNotes({
        page: 1,
        ...useQueryParams()
    })

    return (
        <Grid>
            <Grid.Col>
                <div className="flex justify-between gap-12">
                    <MenuInvoice />
                    <div className="flex gap-2 flex-shrink-0">
                        <ButtonCreateCreditNote />
                        <QuerySearchBar />
                    </div>
                </div>
            </Grid.Col>
            <Grid.Col column={4}>
                <BoxStats />
            </Grid.Col>
            <Grid.Col>
                <CreditNoteTable items={queryCreditNotes.data?.data ?? []} />
                <Paginate className="mt-12" paginate={queryCreditNotes.data?.meta} />
            </Grid.Col>
        </Grid>
    )
}
