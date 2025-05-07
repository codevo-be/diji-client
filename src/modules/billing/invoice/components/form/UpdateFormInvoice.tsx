import { useParams } from 'next/navigation'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { INVOICE_STATUS_DRAFT } from '@billing/invoice/data/invoice-statuses'
import { Box, Button, Form, Grid } from '@digico/ui'
import { Tabs } from '@digico/ui'

import { useUpdateInvoice } from '@billing/invoice/hooks/mutations'
import { useReadInvoice } from '@billing/invoice/hooks/queries'
import { useCreateContact } from '@contact/hooks/mutations'
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
    const { mutate: createContact } = useCreateContact()

    const [createContactVisible, setCreateContactVisible] = useState<boolean>(false);

    const form = useForm<InvoiceType>({
        values: data
    })

    const resetRecipientFields = () => {
        form.resetField('recipient.name');
        form.resetField('recipient.vat_number');
        form.resetField('recipient.email');
        form.resetField('recipient.phone');
        form.resetField('recipient.street');
        form.resetField('recipient.street_number');
        form.resetField('recipient.city');
        form.resetField('recipient.zipcode');
        form.resetField('recipient.country');
    }

    const changeRecipient = (contact: ContactType) => {
        form.setValue('contact_id', contact.id)

        resetRecipientFields();

        // @ts-ignore
        form.setValue('recipient', contact.billing_address)
        form.setValue('recipient.name', contact.display_name)
        form.setValue('recipient.email', contact.email)
        form.setValue('recipient.phone', contact.phone)
        form.setValue('recipient.vat_number', contact.vat_number)
        setCreateContactVisible(false);
    }

    const onSelectContact = (contact_id: number | string) => {
        if (contact_id === -1) {
            setCreateContactVisible(true);
            resetRecipientFields();
            return;
        }

        const contact = contacts?.data.find((contact: ContactType) => contact.id === contact_id)

        if (!contact) {
            return
        }

        changeRecipient(contact)
    }

    const onUpdateField = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        updateInvoice.mutate({
            id: Number(id),
            [key]: e.target.value
        })
    }

    const onAddContact = () => {
        const values = form.getValues('recipient') as any

        const contact: Omit<ContactType, 'id' | 'display_name'> = {
            company_name: values.name,
            email: values.email,
            phone: values.phone,
            vat_number: values.vat_number,
            billing_address: {
                street: values.street,
                street_number: values.street_number,
                city: values.city,
                zipcode: values.zipcode,
                country: values.country
            }
        }

        // @ts-ignore TODO Ne respecte pas le type à cause d'omit
        createContact(contact, {
            onSuccess: (data) => {
                const contactRes = data.data;

                changeRecipient(contactRes);
                updateInvoice.mutate(form.getValues());
            }
        });
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
                        </Form.Row>
                    </Form.Group>
                </Box>
                <Box className={"transition-all duration-500"}>
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
                                options={ [
                                    { label: "Créer un nouveau contact", value: -1 },
                                    ...contacts?.data.map((contact: ContactType) => {
                                        return {
                                            label: contact.display_name,
                                            value: contact.id
                                        }
                                    }) ?? []
                                ]}
                            />

                            <RecipientFields />
                        </Tabs.Content>
                    </Tabs>

                    {createContactVisible &&
                        <Button type={"button"} className={`mt-12 w-full`} intent={"grey200"} onClick={onAddContact}>
                            Créer fiche contact
                        </Button>
                    }

                    <Button className="w-full mt-12" isLoading={updateInvoice.isPending}>
                        Mettre à jour
                    </Button>
                </Box>
            </Form>
        </Grid.Col>
    )
}
