'use client'

import { useParams } from 'next/navigation'

import { Box } from '@/libs/Box'
import { BackButton } from '@/libs/button'
import { Grid } from '@/libs/Grid'
import { TaskColumnCreateForm } from '@/modules/task/components/TaskColumnCreateForm'

export default function Page() {
    const { id: projectId } = useParams()

    return (
        <Grid>
            <Grid.Item>
                <BackButton intent={'text'} />
            </Grid.Item>
            <Grid.Item column={9}>
                <Box title={'Créer une nouvelle liste'}>
                    <TaskColumnCreateForm projectId={Number(projectId)} />
                </Box>
            </Grid.Item>
        </Grid>
    )
}
