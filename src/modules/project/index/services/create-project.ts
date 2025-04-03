import { FieldValues } from 'react-hook-form'

import { httpService } from '@/utils/httpService'

export const createProject = (data: FieldValues | undefined) => httpService.post(`/api/projects`, data ?? {})
