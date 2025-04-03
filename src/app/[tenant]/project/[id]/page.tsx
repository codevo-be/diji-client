'use client'

import { useParams } from 'next/navigation'

import { toast } from 'sonner'

import { Box } from '@/libs/Box'
import { Grid } from '@/libs/Grid'
import { Select } from '@/libs/Select'
import { GeneralForm } from '@/modules/project/index/components/GeneralForm'
import { ProjectHistory } from '@/modules/project/index/components/ProjectHistory'
import { ProjectMenu } from '@/modules/project/index/components/ProjectMenu'
import { PROJECT_STATUSES } from '@/modules/project/index/helpers/statuses'
import { useUpdateProject } from '@/modules/project/index/hooks/mutations/useUpdateProject'
import { useReadProject } from '@/modules/project/index/hooks/queries/useReadProject'

export default function Page() {
    const { id } = useParams()
    const queryProject = useReadProject(Number(id))
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
            <Grid.Item>
                <ProjectMenu />
            </Grid.Item>
            <Grid.Item column={9}>
                <GeneralForm />
            </Grid.Item>
            <Grid.Item column={3}>
                <Grid>
                    <Grid.Item>
                        <Box>
                            <Select
                                label="Statut"
                                options={Object.values(PROJECT_STATUSES)}
                                onChange={handleStatus}
                                placeholder="Sélectionner un statut"
                                defaultValue={queryProject.data?.status}>
                                <Select.Field />
                            </Select>
                        </Box>
                    </Grid.Item>
                    <Grid.Item>
                        <ProjectHistory />
                    </Grid.Item>
                </Grid>
            </Grid.Item>
        </Grid>
    )
}
