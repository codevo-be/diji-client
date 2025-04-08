'use client'

import { useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { Box, Button, Form, Grid, PageHeader } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { useUpdateProject } from '@task/project/hooks/mutations/useUpdateProject'
import { useReadProject } from '@task/project/hooks/queries/useReadProject'

import { ProjectFields } from '@task/project/components/ProjectFields'

export default function Page() {
    const { id } = useParams()
    const data = useReadProject(Number(id))
    const updateProject = useUpdateProject()

    console.log("Données du projet : ", data.data)

    const form = useForm({
        values: data?.data
    })

    return (
        <Grid>
            <Grid.Col>
                <PageHeader label="Retour" href={getTenantUrl(`/project`)}>
                    Projet
                </PageHeader>
            </Grid.Col>
            <Grid.Col>
                <Box>
                   <Form useForm={form} onSubmit={updateProject.mutate}>
                        <ProjectFields />
                        <Button isLoading={updateProject.isPending} type="submit">
                            Mettre à jour
                        </Button>
                    </Form>
                </Box>
            </Grid.Col>
        </Grid>
    )
}
