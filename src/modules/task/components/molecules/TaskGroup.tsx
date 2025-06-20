import { useParams } from 'next/navigation'

import React from 'react'
import { Box } from '@digico/ui'
import { DndContext } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { useUpdateTaskGroup } from '@task/hooks/task-group/mutations/useUpdateTaskGroup'
import { useCreateTaskItem } from '@task/hooks/task-item/mutations/useCreateTaskItem'
import { TaskGroupType } from '@task/types/task-group'

import { Icon } from '@components/Icon'

import { TaskItem } from './TaskItem'

type Props = {
    group: TaskGroupType
}

export const TaskGroup = ({ group }: Props) => {
    const { id } = useParams()

    const createTaskItem = useCreateTaskItem()
    const updateTaskGroup = useUpdateTaskGroup()

    const onCreateTask = () => {
        createTaskItem.mutate({
            project_id: Number(id),
            task_group_id: group.id,
            name: 'Nouvelle tâche'
        })
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value

        if (name === group.name) {
            return
        }

        updateTaskGroup.mutate({
            project_id: Number(id),
            id: group.id,
            name: name
        })
    }

    return (
        <Box className="w-full flex flex-col gap-8">
            <input
                name="name"
                defaultValue={group.name}
                className="transition-all hover:text-grey-800 outline-none font-bold border-b border-b-transparent focus:border-b-grey-400 focus:text-grey-800"
                onBlur={onChangeName}
            />

            <DndContext modifiers={[restrictToVerticalAxis]}>
                <SortableContext strategy={verticalListSortingStrategy} items={group.items ?? []}>
                    <div className="flex flex-col gap-2">
                        <button
                            type="button"
                            className="cursor-pointer transition-all text-xs px-6 py-3 bg-grey-200 border border-grey-400 rounded flex items-center gap-4 hover:bg-primary hover:text-white hover:border-primary group"
                            onClick={onCreateTask}>
                            <Icon name="cross" className="size-3 rotate-45 fill-grey-600 transition-all group-hover:fill-white" />
                            <span>Ajouter une tâche</span>
                        </button>
                        {(group.items ?? [])
                            .filter((item) => {
                                return item.status !== 'completed'
                            })
                            .map((item) => {
                                return <TaskItem key={item.id} item={item} />
                            })}
                    </div>
                </SortableContext>
            </DndContext>
        </Box>
    )
}
