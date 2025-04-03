import { FieldValues } from 'react-hook-form'

import { httpService } from '@/utils/httpService'

export const updateTaskColumn = (taskColumnId: number, data: FieldValues) => {
    return httpService.put(`/api/task-columns/${taskColumnId}`, data)
}
