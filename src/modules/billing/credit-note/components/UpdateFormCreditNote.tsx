import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { Box, Button, Form, Grid } from '@digico/ui'

import { useUpdateCreditNote } from '../hooks/mutations'
import { useReadCreditNote } from '../hooks/queries'
import { CreditNoteType } from '../types/credit-note'

import { CREDIT_NOTE_STATUS_DRAFT } from '../data/credit-note-statuses'

import { CreditNoteFields } from './CreditNoteFields'

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
            <Box>
                <Form useForm={form} onSubmit={updateCreditNote.mutate}>
                    <CreditNoteFields />
                    <Button isLoading={updateCreditNote.isPending}>Mettre à jour</Button>
                </Form>
            </Box>
        </Grid.Col>
    )
}
