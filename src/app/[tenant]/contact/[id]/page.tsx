'use client'

import { useParams } from 'next/navigation'

import { Button, Grid } from '@digico/ui'

import { useDestroyContact } from '@contact/hooks/mutations'

import { UpdateContactForm } from '@contact/components/form/UpdateContactForm'
import { PageHeader } from '@helpers/PageHeader'
import { useRouteTenant } from 'helpers/route-tenant'

export default function Page() {
    const { id } = useParams()
    const routerTenant = useRouteTenant()

    const removeContact = useDestroyContact()

    const onRemoveContact = () => {
        removeContact.mutate(Number(id), {
            onSuccess: () => {
                routerTenant.push('/contact')
            }
        })
    }

    return (
        <Grid>
            <Grid.Col className="flex justify-between items-start">
                <PageHeader label="Retour">Contacts</PageHeader>
                <Button intent={'error'} onClick={onRemoveContact}>
                    Supprimer
                </Button>
            </Grid.Col>
            <Grid.Col>
                <UpdateContactForm />
            </Grid.Col>
        </Grid>
    )
}
