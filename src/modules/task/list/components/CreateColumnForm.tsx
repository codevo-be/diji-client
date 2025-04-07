import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'
import { useRouterWithTenant } from '@digico/utils'

import { useCreateTaskColumn } from '@task/hooks/mutations/useCreateTaskColumn'
import { ContactType } from '@contact/types/contact'

import { ColumnFields } from '@task/list/components/ColumnFields'
import { useParams } from 'next/navigation'

export const CreateColumnForm = () => {
    const { id } = useParams()
    const routerWithTenant = useRouterWithTenant()
    const form = useForm<ContactType>()

    const createTaskColumn = useCreateTaskColumn()

    const handleSubmit = (data: ContactType) => {
        // @ts-ignore
        data['project_id'] = Number(id)
        createTaskColumn.mutate(data, {
            onSuccess: () => {
                routerWithTenant.push('/contact') // todo : changer pour aller vers http://localhost:3001/codevo/project/1/list
                return
            }
        })
    }

    return (
        <Box>
            <Form useForm={form} onSubmit={handleSubmit}>
                <ColumnFields />
                <Button isLoading={createTaskColumn.isPending} type="submit">
                    Ajouter la colonne
                </Button>
            </Form>
        </Box>
    )
}
