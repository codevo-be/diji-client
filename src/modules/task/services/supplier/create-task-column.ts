import { FieldValues } from 'react-hook-form'

import { httpService } from '@/utils/httpService'

export const createTaskColumn = (data: FieldValues) => httpService.post(`/api/task-columns`, data)
