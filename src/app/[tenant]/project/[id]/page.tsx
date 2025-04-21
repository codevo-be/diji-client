'use client'

import { Box, Grid } from '@digico/ui'

import { ButtonDestroyProject } from '@project/components/atoms/ButtonDestroyProject'
import { MenuProject } from '@project/components/molecules/MenuProject'
import { UpdateProjectForm } from '@project/components/organisms/UpdateProjectForm'

export default function Page() {
    return (
        <Grid>
            <Grid.Col>
                <div className="flex justify-between gap-12">
                    <MenuProject />
                </div>
            </Grid.Col>
            <Grid.Col column={9}>
                <UpdateProjectForm />
            </Grid.Col>
            <Grid.Col column={3}>
                <Box>
                    <ButtonDestroyProject />
                </Box>
            </Grid.Col>
        </Grid>
    )
}
