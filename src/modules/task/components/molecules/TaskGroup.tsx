import { useParams } from 'next/navigation'

import React from 'react'
import { Box } from '@digico/ui'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove,SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { useUpdateTaskGroup } from '@task/hooks/task-group/mutations/useUpdateTaskGroup'
import { useBulkUpdate } from '@task/hooks/task-item/mutations/useBulkUpdateTaskItem'
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
    const bulkUpdateTaskItem = useBulkUpdate()

    const [items, setItems] = React.useState(group.items ?? [])

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

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        if (oldIndex === -1 || newIndex === -1) return

        const newItems = arrayMove(items, oldIndex, newIndex)
        setItems(newItems)

        bulkUpdateTaskItem.mutate({
            project_id: Number(id),
            tasks: newItems.map((task, index) => ({
                id: task.id,
                position: index + 1,
                task_group_id: group.id
            }))
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

            <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
                <SortableContext strategy={verticalListSortingStrategy} items={items}>
                    <div className="flex flex-col gap-2">
                        <button
                            type="button"
                            className="cursor-pointer transition-all text-xs px-6 py-3 bg-grey-200 border border-grey-400 rounded flex items-center gap-4 hover:bg-primary hover:text-white hover:border-primary group"
                            onClick={onCreateTask}>
                            <Icon name="cross" className="size-3 rotate-45 fill-grey-600 transition-all group-hover:fill-white" />
                            <span>Ajouter une tâche</span>
                        </button>
                        {items
                            .filter((item) => item.status !== 'completed')
                            .map((item) => (
                                <TaskItem key={item.id} item={item} />
                            ))}
                    </div>
                </SortableContext>
            </DndContext>
        </Box>
    )
}
