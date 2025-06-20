import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { Box, Button, Form } from '@digico/ui'

import { useUpdateProject } from '@project/hooks/mutations/useUpdateProject'
import { useReadProject } from '@project/hooks/queries/useReadProject'
import { ProjectType } from '@project/types/project'

import { ProjectFields } from '@project/components/organisms/ProjectFields'

export const UpdateProjectForm = () => {
    const { id } = useParams()

    const { data } = useReadProject(Number(id))

    const form = useForm<ProjectType>({
        values: data?.data
    })

    const updateProject = useUpdateProject()

    const handleSubmit = (data: ProjectType) => {
        updateProject.mutate(data)
    }

    return (
        <Box>
            <Form useForm={form} onSubmit={handleSubmit}>
                <ProjectFields />
                <Button isLoading={updateProject.isPending} type="submit">
                    Modifier le projet
                </Button>
            </Form>
        </Box>
    )
}
