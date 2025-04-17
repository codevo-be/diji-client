'use client'

import { useParams } from 'next/navigation'

import { FieldValues, useForm } from 'react-hook-form'
import { BillingDocument } from '@billing/document'
import { Box, Button, Form, Grid, PageHeader } from '@digico/ui'

import { useEmailEstimate } from '@billing/estimate/hooks/mutations/useEmailEstimate'
import { useReadEstimate } from '@billing/estimate/hooks/queries'

import { EstimateContent } from '@billing/estimate/components/organisms/document/EstimateContent'
import { useAuth } from 'helpers/auth-context/useAuth'
import { useRouteTenant } from 'helpers/route-tenant'

export default function Page() {
    const { id } = useParams()
    const { tenant } = useAuth()
    const routeTenant = useRouteTenant()

    const { data } = useReadEstimate(Number(id))
    const sendEmail = useEmailEstimate()

    const form = useForm({
        values: {
            to: data?.recipient?.email,
            subject: `${tenant?.name} - Devis ${data?.identifier}`,
            body: `Bonjour ${data?.recipient?.name},

Veuillez trouver en pièce jointe votre devis. Nous vous remercions de votre confiance et restons disponibles pour toute information complémentaire.
            
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
                    routeTenant.push('/billing/estimate')
                }
            }
        )
    }

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux devis" href={routeTenant.get('/billing/estimate')}>
                    Devis {data?.identifier}
                </PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <BillingDocument data={data}>
                    <EstimateContent />
                </BillingDocument>
            </Grid.Col>
            <Grid.Col column={5}>
                <Box>
                    <Button intent={'text'} size={'text'} href={routeTenant.get(`/billing/estimate/${id}`)} className="mb-8">
                        ← Retour
                    </Button>
                    <Form useForm={form} onSubmit={onSubmit}>
                        <Form.Field name="subject" label="Sujet" placeholder="Le sujet de votre email" required={true} />
                        <Form.Field name="cc" label="cc" placeholder="info@jardipro.app" />
                        <Form.Field name="to" label="Envoyer à" placeholder="info@jardipro.app" required={true} />
                        <Form.Field rows={9} type="textarea" name="body" label="Contenu de l'email" placeholder="Bonjour, Suite à votre ..." />

                        <Button isLoading={sendEmail.isPending} type="submit">
                            Envoyer
                        </Button>
                    </Form>
                </Box>
            </Grid.Col>
        </Grid>
    )
}
