import { HttpService } from '@tasks/services/task'

export const updateMultipleTaskItems = (response: any) => {
    const tasks = response.tasks ?? [];

    if (!Array.isArray(tasks)) {
        return Promise.reject(new Error("tasks doit être un tableau"));
    }

    const formattedTasks = tasks.map(task => ({
        id: task.id,
        name: task.title,
        description: task.content,
        // status: 'pending',
        // priority: 1,
        task_column_id: task.category_id,
        order: task.order
    }));

    return HttpService.put('/api/task-items/bulk-update', { tasks: formattedTasks });
};

