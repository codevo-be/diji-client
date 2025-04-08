import { HttpService } from '@task/services/taskItems/index'
import { KanbanTaskType } from '@task/types/kanban-task.types'

export const updateMultipleTasks = async (tasks: KanbanTaskType[]) => {
    const formattedTasks = tasks.map(task => ({
        id: task.id,
        name: task.title,
        description: task.content,
        task_column_id: task.category_id,
        order: task.order,
    }))

    return HttpService.put('/bulk-update', { tasks: formattedTasks })
}
