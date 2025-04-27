import { Box, Tag } from '@digico/ui'
import { useSortable } from '@dnd-kit/sortable'
import { useTask } from '@task/contexts/task/useTask'
import { TASK_STATUSES } from '@task/data/statuses'

import { TaskItemType } from '@task/types/task-item'

import { Icon } from '@components/Icon'

export const TaskItem = ({ item }: { item: TaskItemType }) => {
    const { setTask } = useTask()
    const { setNodeRef, transform, transition, attributes, listeners } = useSortable({ id: item.id })

    const onShowTask = () => {
        setTask(item)
    }

    return (
        <div
            className="cursor-pointer"
            onClick={onShowTask}
            key={item.id}
            ref={setNodeRef}
            style={{
                transform: transform ? `translate(${transform.x}px, ${transform.y}px) scale(${transform.scaleX}, ${transform.scaleY})` : 'none',
                transition: transition ?? 'none'
            }}>
            <Box className="px-6 py-3 flex gap-4 justify-between">
                <p className="text-xs">
                    <strong className="font-semibold mr-2">#{item.task_number}</strong> <span>{item.name}</span>
                </p>
                <div className="flex gap-6">
                    {/* @ts-ignore */}
                    <Tag size={'xs'}>{TASK_STATUSES[item.status].label}</Tag>
                    <button {...attributes} {...listeners} className={`text-grey-600 hover:text-primary transition-all cursor-grab`}>
                        <Icon name="sort" className="fill-current size-6" />
                    </button>
                </div>
            </Box>
        </div>
    )
}
