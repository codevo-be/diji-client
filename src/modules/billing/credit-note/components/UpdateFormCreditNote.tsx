import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { Box, Button, Form, Grid, Tabs } from '@digico/ui'

import { useUpdateCreditNote } from '../hooks/mutations'
import { useReadCreditNote } from '../hooks/queries'
import { CreditNoteType } from '../types/credit-note'

import { IssuerFields } from '@billing/invoice/components/form/IssuerFields'
import { RecipientFields } from '@billing/invoice/components/form/RecipientFields'

import { CREDIT_NOTE_STATUS_DRAFT } from '../data/credit-note-statuses'

export const UpdateFormCreditNote = () => {
    const { id } = useParams()
    const { data } = useReadCreditNote(Number(id))
    const updateCreditNote = useUpdateCreditNote()

    const form = useForm<CreditNoteType>({
        values: data
    })

    if (data?.status !== CREDIT_NOTE_STATUS_DRAFT) {
        return null
    }

    return (
        <Grid.Col>
            <Form useForm={form} onSubmit={updateCreditNote.mutate}>
                <Box>
                    <Tabs defaultStep={'recipient'}>
                        <Tabs.Head id="issuer">Expéditeur</Tabs.Head>
                        <Tabs.Head id="recipient">Destinataire</Tabs.Head>
                        <Tabs.Content id={'issuer'}>
                            <IssuerFields />
                        </Tabs.Content>
                        <Tabs.Content id={'recipient'}>
                            <RecipientFields />
                        </Tabs.Content>
                    </Tabs>
                    <Button className="w-full mt-12" isLoading={updateCreditNote.isPending}>
                        Mettre à jour
                    </Button>
                </Box>
            </Form>
        </Grid.Col>
    )
}
