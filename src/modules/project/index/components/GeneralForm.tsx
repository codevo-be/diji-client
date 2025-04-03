import { useParams } from 'next/navigation'

import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useUpdateProject } from '../hooks/mutations/useUpdateProject'
import { useReadProject } from '../hooks/queries/useReadProject'

import { ProjectFields } from './form/ProjectFields'

import { Box } from '@/libs/Box'
import { Button } from '@/libs/button'
import { Form } from '@/libs/form'
import { LoadingQuery } from '@/utils/LoadingQuery'

export const GeneralForm = () => {
    const { id } = useParams()
    const queryProject = useReadProject(Number(id))
    const mutationProject = useUpdateProject()

    const form = useForm({
        values: queryProject.data
    })

    const handleSubmit = (data: FieldValues) => {
        mutationProject.mutate(
            {
                id: Number(id),
                ...data
            },
            {
                onSuccess: () => {
                    toast.success('Le projet a été mis à jour !')
                }
            }
        )
    }

    return (
        <LoadingQuery query={queryProject}>
            {() => {
                return (
                    <Box title="Informations générales">
                        <Form onSubmit={handleSubmit} useForm={form}>
                            <ProjectFields />
                            <Button isLoading={mutationProject.isPending} type="submit">
                                Sauvegarder
                            </Button>
                        </Form>
                    </Box>
                )
            }}
        </LoadingQuery>
    )
}
