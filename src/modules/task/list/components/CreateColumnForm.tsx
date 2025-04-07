import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'
import { useRouterWithTenant } from '@digico/utils'

import { useCreateContact } from '@contact/hooks/mutations'
import { ContactType } from '@contact/types/contact'

import { ColumnFields } from '@task/list/components/ColumnFields'

export const CreateColumnForm = () => {
    const routerWithTenant = useRouterWithTenant()
    const form = useForm<ContactType>()

    const createContact = useCreateContact()

    const handleSubmit = (data: ContactType) => {
        createContact.mutate(data, {
            onSuccess: () => {
                routerWithTenant.push('/contact')
                return
            }
        })
    }

    return (
        <Box>
            <Form useForm={form} onSubmit={handleSubmit}>
                <ColumnFields />
                <Button isLoading={createContact.isPending} type="submit">
                    Ajouter la colonne
                </Button>
            </Form>
        </Box>
    )
}
