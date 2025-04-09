import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'

import { useCreateContact } from '@contact/hooks/mutations'
import { ContactType } from '@contact/types/contact'

import { useRouteTenant } from 'helpers/route-tenant'

import { ContactFields } from './ContactFields'

export const CreateContactForm = () => {
    const routerTenant = useRouteTenant()
    const form = useForm<ContactType>()

    const createContact = useCreateContact()

    const handleSubmit = (data: ContactType) => {
        createContact.mutate(data, {
            onSuccess: () => {
                routerTenant.push('/contact')
                return
            }
        })
    }

    return (
        <Box>
            <Form useForm={form} onSubmit={handleSubmit}>
                <ContactFields />
                <Button isLoading={createContact.isPending} type="submit">
                    Ajouter le contact
                </Button>
            </Form>
        </Box>
    )
}
