import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { INVOICE_STATUS_DRAFT } from '@billing/invoice/data/invoice-statuses'
import { Box, Button, Form, Grid } from '@digico/ui'
import { Tabs } from '@digico/ui'

import { useUpdateInvoice } from '@billing/invoice/hooks/mutations'
import { useReadInvoice } from '@billing/invoice/hooks/queries'
import { useReadContacts } from '@contact/hooks/queries'
import { InvoiceType } from '@billing/invoice/types/invoice'
import { ContactType } from '@contact/types/contact'

import { IssuerFields } from './IssuerFields'
import { RecipientFields } from './RecipientFields'

export const UpdateFormInvoice = () => {
    const { id } = useParams()
    const { data } = useReadInvoice(Number(id))
    const updateInvoice = useUpdateInvoice()
    const { data: contacts } = useReadContacts()

    const form = useForm<InvoiceType>({
        values: data
    })

    console.log(data);

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

    const onUpdateField = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        updateInvoice.mutate({
            id: Number(id),
            [key]: e.target.value
        })
    }

    if (data?.status !== INVOICE_STATUS_DRAFT) {
        return null
    }

    return (
        <Grid.Col>
            <Form useForm={form} onSubmit={updateInvoice.mutate}>
                <Box>
                    <Form.Group>
                        <Form.Row>
                            <Form.Field
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateField(e, 'date')}
                                name="date"
                                id="date"
                                type="date"
                                label="Date de la facture"
                            />
                            <Form.Field
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateField(e, 'date')}
                                name="due_date"
                                id="due_date"
                                type="date"
                                label="Date d'échéance"
                            />

                            <Form.Field
                                type="checkbox"
                                id={"check_paid_notification"}
                                name={"check_paid_notification"}
                                label={"Notifications"}
                            />

                        </Form.Row>
                    </Form.Group>
                </Box>
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
                    <Button className="w-full mt-12" isLoading={updateInvoice.isPending}>
                        Mettre à jour
                    </Button>
                </Box>
            </Form>
        </Grid.Col>
    )
}
