import { FieldValues } from 'react-hook-form'

import { HttpService } from '@projects/index/services/index'

export const createProject = (data: FieldValues | undefined) => HttpService.post(`/api/projects`, data ?? {})
