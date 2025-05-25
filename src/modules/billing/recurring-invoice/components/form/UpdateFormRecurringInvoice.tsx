'use client'

import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { RECURRING_INVOICE_STATUS_DRAFT } from '@billing/recurring-invoice/data/recurring-invoice-statuses'
import { Box, Button, Form, Grid } from '@digico/ui'
import { Tabs } from '@digico/ui'

import { useUpdateRecurringInvoice } from '@billing/recurring-invoice/hooks/mutations'
import { useReadRecurringInvoice } from '@billing/recurring-invoice/hooks/queries'
import { useReadContacts } from '@contact/hooks/queries'
import { RecurringInvoiceType } from '@billing/recurring-invoice/types/recurring-invoice'
import { ContactType } from '@contact/types/contact'

import { IssuerFields } from './IssuerFields'
import { RecipientFields } from './RecipientFields'

export const UpdateFormRecurringInvoice = () => {
    const { id } = useParams()
    const { data } = useReadRecurringInvoice(Number(id))
    const updateRecurringInvoice = useUpdateRecurringInvoice()
    const { data: contacts } = useReadContacts()

    const form = useForm<RecurringInvoiceType>({
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

    if (data?.status !== RECURRING_INVOICE_STATUS_DRAFT) {
        return null
    }

    return (
        <Grid.Col>
            <Form useForm={form} onSubmit={updateRecurringInvoice.mutate}>
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
                    <Button className="w-full mt-12" isLoading={updateRecurringInvoice.isPending}>
                        Mettre à jour
                    </Button>
                </Box>
            </Form>
        </Grid.Col>
    )
}
