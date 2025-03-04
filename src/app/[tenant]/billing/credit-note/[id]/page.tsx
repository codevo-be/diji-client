'use client'

import { useParams } from 'next/navigation'

import { CREDIT_NOTE_STATUS_DRAFT } from '@billing/credit-note/data/credit-note-statuses'
import { BillingDocument } from '@billing/document'
import { Grid, PageHeader } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { useReadCreditNote } from '@billing/credit-note/hooks/queries'

import { CreditNoteContent } from '@billing/credit-note/components/document/CreditNoteContent'
import { CreditNoteContentEditable } from '@billing/credit-note/components/document/CreditNoteContentEditable'
import { SummaryCreditNote } from '@billing/credit-note/components/Summary'

export default function Page() {
    const { id } = useParams()
    const { data } = useReadCreditNote(Number(id))

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux notes de crédit" href={getTenantUrl('/billing/credit-note')}>
                    Note de crédit {data?.identifier}
                </PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <BillingDocument data={data}>
                    {data?.status === CREDIT_NOTE_STATUS_DRAFT ? <CreditNoteContentEditable /> : <CreditNoteContent />}
                </BillingDocument>
            </Grid.Col>
            <Grid.Col column={5}>
                <SummaryCreditNote />
            </Grid.Col>
        </Grid>
    )
}
