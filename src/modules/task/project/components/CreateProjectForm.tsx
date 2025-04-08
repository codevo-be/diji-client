import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'
import { useRouterWithTenant } from '@digico/utils'

import { useCreateTaskProject } from '@task/hooks/mutations/useCreateTaskProject'
import { ContactType } from '@contact/types/contact'

import { ProjectFields } from '@task/project/components/ProjectFields'

export const CreateProjectForm = () => {
    const { id } = useParams()
    const routerWithTenant = useRouterWithTenant()
    const form = useForm<ContactType>()

    const createTaskProject = useCreateTaskProject()

    const handleSubmit = (data: any) => {
        // @ts-ignore
        data['project_id'] = Number(id)
        createTaskProject.mutate(data, {
            onSuccess: () => {
                routerWithTenant.push(`/project`)
                return
            }
        })
    }

    return (
        <Box>
            <Form useForm={form} onSubmit={handleSubmit}>
                <ProjectFields />
                <Button isLoading={createTaskProject.isPending} type="submit">
                    Ajouter un projet
                </Button>
            </Form>
        </Box>
    )
}
