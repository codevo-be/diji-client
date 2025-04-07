'use client'

import { useParams } from 'next/navigation'

import { Grid } from '@digico/ui'

import { useReadColumns } from '@task/hooks/queries'

import { MenuTask } from '@task/components/MenuTask'
import { TaskColumnList } from '@task/list/components/TaskColumnList'
import { TaskItemForm } from '@task/list/components/TaskItemForm'

export default function Page() {
    const { id } = useParams()
    const queryColumns = useReadColumns(Number(id))

    return (
        <Grid>
            <Grid.Col>
                <MenuTask />
            </Grid.Col>
            <Grid.Col>
                <div className="flex gap-6 flex-1">
                    <div className="flex-1 overflow-y-auto">
                        {/* @ts-ignore */}
                        <TaskColumnList items={queryColumns.data?.data ?? []} />
                    </div>
                    <div className="w-1/3 bg-gray-100 p-4 rounded-lg h-screen overflow-y-auto sticky top-0">
                        {/* @ts-ignore */}
                        <TaskItemForm id={1} />
                    </div>
                </div>
            </Grid.Col>
        </Grid>
    )
}
