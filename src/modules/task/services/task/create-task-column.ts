import { FieldValues } from 'react-hook-form'

export const createTaskColumn = (data: FieldValues) => HttpService.post(`/api/task-columns`, data)
