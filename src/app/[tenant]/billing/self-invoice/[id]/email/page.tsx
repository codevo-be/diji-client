'use client'

import { useParams } from 'next/navigation'

import { FieldValues, useForm } from 'react-hook-form'
import { BillingDocument } from '@billing/document'
import { Box, Button, Form, Grid, PageHeader } from '@digico/ui'
import { getTenantUrl, useAuth, useRouterWithTenant } from '@digico/utils'

import { useEmailSelfInvoice } from '@billing/self-invoice/hooks/mutations/useEmailSelfInvoice'
import { useReadSelfInvoice } from '@billing/self-invoice/hooks/queries'

import { SelfInvoiceContent } from '@billing/self-invoice/components/document/SelfInvoiceContent'

export default function Page() {
    const { id } = useParams()
    const { tenant } = useAuth()
    const routerWithTenant = useRouterWithTenant()

    const { data } = useReadSelfInvoice(Number(id))
    const sendEmail = useEmailSelfInvoice()

    const form = useForm({
        values: {
            email: data?.recipient?.email,
            subject: `${tenant?.name} - Facture ${data?.identifier}`,
            body: `Bonjour ${data?.recipient?.name},

Veuillez trouver en pièce jointe votre facture concernant la prestation réalisée. Nous vous remercions de votre confiance et restons disponibles pour toute information complémentaire.
            
Excellente journée
L'équipe ${tenant?.name}`
        }
    })

    const onSubmit = (data: FieldValues) => {
        sendEmail.mutate(
            {
                id: Number(id),
                ...data
            },
            {
                onSuccess: () => {
                    routerWithTenant.push('/billing/self-invoice')
                }
            }
        )
    }

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux factures" href={getTenantUrl('/billing/self-invoice')}>
                    Facture {data?.identifier}
                </PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <BillingDocument data={data}>
                    <SelfInvoiceContent />
                </BillingDocument>
            </Grid.Col>
            <Grid.Col column={5}>
                <Box>
                    <Button intent={'text'} size={'text'} href={getTenantUrl(`/billing/self-invoice/${id}`)} className="mb-8">
                        ← Retour
                    </Button>
                    <Form useForm={form} onSubmit={onSubmit}>
                        <Form.Field name="subject" label="Sujet" placeholder="Le sujet de votre email" required={true} />
                        <Form.Field name="cc" label="cc" placeholder="info@jardipro.app" />
                        <Form.Field name="to" label="Envoyer à" placeholder="info@jardipro.app" required={true} />
                        <Form.Field rows={9} type="textarea" name="body" label="Contenu de l'email" placeholder="Bonjour, Suite à votre ..." />

                        <Button isLoading={sendEmail.isPending} type="submit">
                            Envoyé
                        </Button>
                    </Form>
                </Box>
            </Grid.Col>
        </Grid>
    )
}
