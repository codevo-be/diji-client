import { FieldValues } from 'react-hook-form'

import { httpService } from '@/utils/httpService'

export const updateProjectStep = async ({ id, ...data }: FieldValues) => httpService.put(`/api/projects/${data.project_id}/steps/${id}`, data)
