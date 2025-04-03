import { FieldValues } from 'react-hook-form'

import { httpService } from '@/utils/httpService'

export const updateProjectReport = async ({ project_id, id, ...data }: FieldValues) => httpService.put(`/api/projects/${project_id}/reports/${id}`, data)
