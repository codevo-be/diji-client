import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'
import { toast } from 'sonner'

import { useUpdateContact } from '@contact/hooks/mutations'
import { useReadContact } from '@contact/hooks/queries'
import { ContactType } from '@contact/types/contact'

import { ContactFields } from '@contact/components/form/ContactFields'

export const UpdateContactForm = () => {
    const { id } = useParams()
    const { data } = useReadContact(Number(id))

    const form = useForm({
        //@ts-ignore
        values: data?.data
    })

    const updateContact = useUpdateContact()

    const handleSubmit = (data: ContactType) => {
        updateContact.mutate(data, {
            onSuccess: () => {
                toast.success('Le contact à été mis à jour !')
            },
            onError: (e) => {
                toast.error(e.message)
            }
        })
    }

    return (
        <Box>
            <Form useForm={form} onSubmit={handleSubmit}>
                <ContactFields />
                <Button isLoading={updateContact.isPending} type="submit">
                    Mettre à jour
                </Button>
            </Form>
        </Box>
    )
}
