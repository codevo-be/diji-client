'use client'

import { useParams } from 'next/navigation'

import { useState } from 'react'
import { Button, Grid } from '@digico/ui'
import { getTenantUrl } from '@digico/utils'

import { useReadColumns } from '@task/hooks/queries'

import { MenuTask } from '@task/components/MenuTask'
import { TaskColumnList } from '@task/list/components/TaskColumnList'
import { TaskItemForm } from '@task/list/components/TaskItemForm'
import { TaskItem } from '@task/types/task_item'

export default function Page() {
    const { id } = useParams()
    const queryColumns = useReadColumns(Number(id))

    const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null)

    return (
        <Grid>
            <Grid.Col>
                <MenuTask />
            </Grid.Col>
            <Grid.Col>
                <Button href={getTenantUrl(`/project/${id}/list/create`)}>
                    Nouvelle liste
                </Button>
            </Grid.Col>
            <Grid.Col>
                <div className="flex gap-6 flex-1">
                    <div className="flex-1 overflow-y-auto">
                        <TaskColumnList
                            items={queryColumns.data?.data ?? []}
                            onSelectTask={setSelectedTask}
                        />
                    </div>
                    <div className="w-1/3 bg-gray-100 p-4 rounded-lg h-screen overflow-y-auto sticky top-0">
                        <TaskItemForm task={selectedTask} />
                    </div>
                </div>
            </Grid.Col>
        </Grid>
    )
}
