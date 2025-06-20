'use client'

import { useParams } from 'next/navigation'

import { FieldValues, useForm } from 'react-hook-form'
import { Box, Button, Form, Grid, PageHeader } from '@digico/ui'

import { useEmailCreditNote } from '@billing/credit-note/hooks/mutations/useEmailCreditNote'
import { useReadCreditNote } from '@billing/credit-note/hooks/queries'

import { DocumentCreditNote } from '@billing/credit-note/components/organisms/DocumentCreditNote'
import { useAuth } from 'helpers/auth-context/useAuth'
import { useRouteTenant } from 'helpers/route-tenant'

export default function Page() {
    const { id } = useParams()
    const { tenant } = useAuth()
    const routerTenant = useRouteTenant()

    const { data } = useReadCreditNote(Number(id))
    const sendEmail = useEmailCreditNote()

    const form = useForm({
        values: {
            to: data?.recipient?.email,
            subject: `${tenant?.name} - Note de crédit ${data?.identifier}`,
            body: `Bonjour ${data?.recipient?.name},

Veuillez trouver en pièce jointe votre note de crédit concernant la prestation réalisée. Nous vous remercions de votre confiance et restons disponibles pour toute information complémentaire.
            
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
                    routerTenant.push('/billing/credit-note')
                }
            }
        )
    }

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour aux notes de crédit" href={routerTenant.get('/billing/credit-note')}>
                    Note de crédit {data?.identifier}
                </PageHeader>
            </Grid.Col>
            <Grid.Col column={7}>
                <DocumentCreditNote />
            </Grid.Col>
            <Grid.Col column={5}>
                <Box>
                    <Button intent={'text'} size={'text'} href={routerTenant.get(`/billing/credit-note/${id}`)} className="mb-8">
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
