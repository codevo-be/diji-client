import { FieldValues } from 'react-hook-form'

import { HttpService } from '@tasks/services/task'


export const updateTaskColumn = (taskColumnId: number, data: FieldValues) => {
    return HttpService.put(`/api/task-columns/${taskColumnId}`, data)
}
