'use client'

import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { ESTIMATE_STATUS_DRAFT } from '@billing/estimate/data/estimate-statuses'
import { Box, Button, Form, Grid } from '@digico/ui'
import { Tabs } from '@digico/ui'

import { useUpdateEstimate } from '@billing/estimate/hooks/mutations'
import { useReadEstimate } from '@billing/estimate/hooks/queries'
import { useReadContacts } from '@contact/hooks/queries'
import { EstimateType } from '@billing/estimate/types/estimate'
import { ContactType } from '@contact/types/contact'

import { IssuerFields } from './IssuerFields'
import { RecipientFields } from './RecipientFields'

export const UpdateFormEstimate = () => {
    const { id } = useParams()
    const { data } = useReadEstimate(Number(id))
    const updateEstimate = useUpdateEstimate()
    const { data: contacts } = useReadContacts()

    const form = useForm<EstimateType>({
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

    const onUpdateField = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        updateEstimate.mutate({
            id: Number(id),
            [key]: e.target.value
        })
    }

    if (data?.status !== ESTIMATE_STATUS_DRAFT) {
        return null
    }

    return (
        <Grid.Col>
            <Form useForm={form} onSubmit={updateEstimate.mutate}>
                <Box>
                    <Form.Group>
                        <Form.Row>
                            <Form.Field
                                onInput={(e: React.ChangeEvent<HTMLInputElement>) => onUpdateField(e, 'date')}
                                name="date"
                                id="date"
                                type="date"
                                label="Date du devis"
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
                    <Button className="w-full mt-12" isLoading={updateEstimate.isPending}>
                        Mettre à jour
                    </Button>
                </Box>
            </Form>
        </Grid.Col>
    )
}
