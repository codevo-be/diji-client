'use client'

import { Grid } from '@/libs/Grid'
import { ProjectMenu } from '@/modules/project/index/components/ProjectMenu'
import { CreateReportItem } from '@/modules/project/report-item/components/CreateReportItem'
import { ReportItemList } from '@/modules/project/report-item/components/ReportItemList'

export default function Page() {
    return (
        <Grid>
            <Grid.Item column={6}>
                <ProjectMenu />
            </Grid.Item>
            <Grid.Item>
                <CreateReportItem />
            </Grid.Item>
            <Grid.Item>
                <ReportItemList />
            </Grid.Item>
        </Grid>
    )
}
