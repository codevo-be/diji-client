'use client'

import { BackButton } from '@/libs/button/index'
import { Grid } from '@/libs/Grid'
import { CategoryUpdateForm } from '@/modules/category/components/CategoryUpdateForm'
import { ProjectStep } from '@/modules/project/step/components/ProjectStep'

export default function Page() {
    return (
        <Grid>
            <Grid.Item>
                <BackButton intent={'text'} />
            </Grid.Item>
            <Grid.Item>
                <CategoryUpdateForm />
            </Grid.Item>
            <Grid.Item>
                <ProjectStep />
            </Grid.Item>
        </Grid>
    )
}
