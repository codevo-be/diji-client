import { FieldValues } from 'react-hook-form'

import { HttpService } from '@tasks/services/task'


export const createTaskItem = (data: FieldValues) =>
    HttpService.post(`/api/task-columns/${data.task_column_id}/task-items`, data)
