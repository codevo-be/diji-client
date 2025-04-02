import { FieldValues } from 'react-hook-form'

import { HttpService } from '@contact/services'

export const createTaskColumn = (data: FieldValues) => HttpService.post(`/api/task-columns`, data)
