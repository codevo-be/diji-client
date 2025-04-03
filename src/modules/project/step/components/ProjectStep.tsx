import { ProjectStepCreateForm } from './ProjectStepCreateForm'
import { ProjectStepList } from './ProjectStepList'

import { Box } from '@/libs/Box'
import { Grid } from '@/libs/Grid'

export const ProjectStep = () => {
    return (
        <Box title="Étapes de projet">
            <Grid>
                <Grid.Item>
                    <ProjectStepCreateForm />
                </Grid.Item>
                <Grid.Item>
                    <div className="w-full bg-grey-400 h-[1px]"></div>
                </Grid.Item>
                <Grid.Item>
                    <ProjectStepList />
                </Grid.Item>
            </Grid>
        </Box>
    )
}
