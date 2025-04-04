'use client'

import { useParams } from 'next/navigation'

import { Grid } from '@digico/ui'

import { useReadColumns } from '@task/hooks/queries'

import { MenuTask } from '@task/components/MenuTask'
import { TaskColumnList } from '@task/list/components/TaskColumnList'

export default function Page() {
    const { id } = useParams()
    const queryColumns = useReadColumns(Number(id))

    return (
        <Grid>
            <Grid.Col>
                <MenuTask />
            </Grid.Col>
            <Grid.Col>
                {/* @ts-ignore */}
                <TaskColumnList items={queryColumns.data?.data ?? []} />
            </Grid.Col>
        </Grid>
    )
}
