'use client'

import { useParams } from 'next/navigation'

import { Box, Form, Grid } from '@digico/ui'
import { PROJECT_STATUSES } from '@projects/index/helpers/statuses'
import { toast } from 'sonner'

import { useUpdateProject } from '@projects/index/hooks/mutations/useUpdateProject'

import { GeneralForm } from '@projects/index/components/GeneralForm'
import { ProjectHistory } from '@projects/index/components/ProjectHistory'
import { ProjectMenu } from '@projects/index/components/ProjectMenu'

export default function Page() {
    const { id } = useParams()
    const mutationProject = useUpdateProject()

    const handleStatus = ({ value }: any) => {
        mutationProject.mutate(
            {
                id: Number(id),
                status: value
            },
            {
                onSuccess: () => {
                    toast.success('Statut mis à jour !')
                }
            }
        )
    }

    return (
        <Grid>
            <Grid.Col>
                <ProjectMenu />
            </Grid.Col>
            <Grid.Col column={9}>
                <GeneralForm />
            </Grid.Col>
            <Grid.Col column={3}>
                <Grid>
                    <Grid.Col>
                        <Box>
                            <Form.Select name={"Statut"} options={Object.values(PROJECT_STATUSES)} label={"Statut"} onChange={handleStatus}/>
                        </Box>
                    </Grid.Col>
                    <Grid.Col>
                        <ProjectHistory />
                    </Grid.Col>
                </Grid>
            </Grid.Col>
        </Grid>
    )
}
