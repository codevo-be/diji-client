'use client'

import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { Box, Button, Form, Grid, Tabs } from '@digico/ui'

import { useUpdateCreditNote } from '../hooks/mutations'
import { useReadCreditNote } from '../hooks/queries'
import { useReadContacts } from '@contact/hooks/queries'
import { CreditNoteType } from '../types/credit-note'
import { ContactType } from '@contact/types/contact'

import { IssuerFields } from '@billing/invoice/components/form/IssuerFields'
import { RecipientFields } from '@billing/invoice/components/form/RecipientFields'

import { CREDIT_NOTE_STATUS_DRAFT } from '../data/credit-note-statuses'

export const UpdateFormCreditNote = () => {
    const { id } = useParams()
    const { data } = useReadCreditNote(Number(id))
    const updateCreditNote = useUpdateCreditNote()
    const { data: contacts } = useReadContacts()

    const form = useForm<CreditNoteType>({
        values: data
    })

    const onSelectContact = (contact_id: number | string) => {
        const contact = contacts?.data.find((contact: ContactType) => contact.id === contact_id)

        if (!contact) {
            return
        }

        //@ts-ignore
        form.setValue('recipient', contact.billing_address)
        form.setValue('recipient.name', contact.display_name)
        form.setValue('recipient.email', contact.email)
        form.setValue('recipient.phone', contact.phone)
        form.setValue('recipient.vat_number', contact.vat_number)
    }

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
                            <Form.Select
                                className="mb-8"
                                name="contact_id"
                                label="Contact"
                                onChange={onSelectContact}
                                options={
                                    contacts?.data.map((contact: ContactType) => {
                                        return {
                                            label: contact.display_name,
                                            value: contact.id
                                        }
                                    }) ?? []
                                }
                            />
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
