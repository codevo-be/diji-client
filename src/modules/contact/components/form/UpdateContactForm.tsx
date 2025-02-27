import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'

import { useUpdateContact } from '@contact/hooks/mutations'
import { useReadContact } from '@contact/hooks/queries'

import { ContactFields } from '@contact/components/form/ContactFields'

export const UpdateContactForm = () => {
    const { id } = useParams()
    const { data } = useReadContact(Number(id))
    const updateContact = useUpdateContact()

    const form = useForm({
        values: data?.data
    })

    return (
        <Box>
            <Form useForm={form} onSubmit={updateContact.mutate}>
                <ContactFields />
                <Button isLoading={updateContact.isPending} type="submit">
                    Mettre à jour
                </Button>
            </Form>
        </Box>
    )
}
