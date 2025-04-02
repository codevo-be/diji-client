import { FieldValues } from 'react-hook-form'

import { httpService } from '@/utils/httpService'

export const updateTaskItem = (taskId: number, data: FieldValues) => {
    return httpService.put(`/api/task-items/${taskId}`, data)
}
