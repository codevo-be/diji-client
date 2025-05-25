'use client'

import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { INVOICE_STATUS_DRAFT } from '@billing/invoice/data/invoice-statuses'
import { Box, Button, Form, Grid, Tabs } from '@digico/ui'

import { useUpdateSelfInvoice } from '@billing/self-invoice/hooks/mutations'
import { useReadSelfInvoice } from '@billing/self-invoice/hooks/queries'
import { useReadContacts } from '@contact/hooks/queries'
import { SelfInvoiceType } from '@billing/self-invoice/types/self-invoice'
import { ContactType } from '@contact/types/contact'

import { IssuerFields } from '@billing/invoice/components/form/IssuerFields'
import { RecipientFields } from '@billing/invoice/components/form/RecipientFields'

export const UpdateFormSelfInvoice = () => {
    const { id } = useParams()
    const { data } = useReadSelfInvoice(Number(id))
    const { data: contacts } = useReadContacts()
    const updateSelfInvoice = useUpdateSelfInvoice()

    const form = useForm<SelfInvoiceType>({
        values: data
    })

    const onSelectContact = (contact_id: number | string) => {
        const contact = contacts?.data.find((contact: ContactType) => contact.id === contact_id)

        if (!contact) {
            return
        }

        //@ts-ignore
        form.setValue('issuer', contact.billing_address)
        form.setValue('issuer.name', contact.display_name)
        form.setValue('issuer.email', contact.email)
        form.setValue('issuer.phone', contact.phone)
        form.setValue('issuer.vat_number', contact.vat_number)
        form.setValue('issuer.iban', contact.iban ?? '')
    }

    if (data?.status !== INVOICE_STATUS_DRAFT) {
        return null
    }

    return (
        <Grid.Col>
            <Form useForm={form} onSubmit={updateSelfInvoice.mutate}>
                <Box>
                    <Tabs defaultStep={'recipient'}>
                        <Tabs.Head id="issuer">Expéditeur</Tabs.Head>
                        <Tabs.Head id="recipient">Destinataire</Tabs.Head>
                        <Tabs.Content id={'issuer'}>
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
                            <IssuerFields />
                        </Tabs.Content>
                        <Tabs.Content id={'recipient'}>
                            <RecipientFields />
                        </Tabs.Content>
                    </Tabs>
                    <Button className="w-full mt-12" isLoading={updateSelfInvoice.isPending}>
                        Mettre à jour
                    </Button>
                </Box>
            </Form>
        </Grid.Col>
    )
}
