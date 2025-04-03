import { FieldValues } from 'react-hook-form'

import { httpService } from '@/utils/httpService'

export const createProjectStep = (data: FieldValues) => httpService.post(`/api/projects/${data.project_id}/steps`, data)
