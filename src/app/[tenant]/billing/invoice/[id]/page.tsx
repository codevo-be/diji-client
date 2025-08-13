'use client'

import { useParams } from 'next/navigation'

import { Grid } from '@digico/ui'

import { useReadInvoice } from '@billing/invoice/hooks/queries'

import { DocumentInvoice } from '@billing/invoice/components/organisms/DocumentInvoice'
import { SummaryInvoice } from '@billing/invoice/components/Summary'
import { BoxLoading } from '@components/ui/atoms/BoxLoading'
import { PageHeader } from '@helpers/PageHeader'

export default function Page() {
    const { id } = useParams()
    const { data, isSuccess } = useReadInvoice(Number(id))

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux factures">Facture {data?.identifier}</PageHeader>
            </Grid.Col>

            {isSuccess ? (
                <>
                    <Grid.Col column={7}>
                        <DocumentInvoice />
                    </Grid.Col>
                    <Grid.Col column={5}>
                        <SummaryInvoice />
                    </Grid.Col>
                </>
            ) : (
                <Grid.Col>
                    <BoxLoading className="!h-[68rem]" />
                </Grid.Col>
            )}
        </Grid>
    )
}
