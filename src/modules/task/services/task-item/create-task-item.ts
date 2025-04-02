import { FieldValues } from 'react-hook-form'

import { httpService } from '@/utils/httpService'

export const createTaskItem = (data: FieldValues) =>
    httpService.post(`/api/task-columns/${data.task_column_id}/task-items`, data)
