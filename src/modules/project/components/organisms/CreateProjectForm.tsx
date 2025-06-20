import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'

import { useCreateProject } from '@project/hooks/mutations/useCreateProject'
import { ProjectType } from '@project/types/project'

import { ProjectFields } from '@project/components/organisms/ProjectFields'
import { useRouteTenant } from 'helpers/route-tenant'

export const CreateProjectForm = () => {
    const routerTenant = useRouteTenant()
    const form = useForm<ProjectType>()

    const createProject = useCreateProject()

    const handleSubmit = (data: ProjectType) => {
        createProject.mutate(data, {
            onSuccess: ({ data }) => {
                routerTenant.push(`/project/${data.id}`)
            }
        })
    }

    return (
        <Box>
            <Form useForm={form} onSubmit={handleSubmit}>
                <ProjectFields />
                <Button isLoading={createProject.isPending} type="submit">
                    Ajouter un projet
                </Button>
            </Form>
        </Box>
    )
}
