import { FieldValues } from 'react-hook-form'

import { HttpService } from '@tasks/services/task'


export const updateTaskItem = (taskId: number, data: FieldValues) => {
    return HttpService.put(`/api/task-items/${taskId}`, data)
}
