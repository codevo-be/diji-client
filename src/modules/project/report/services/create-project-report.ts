import { FieldValues } from 'react-hook-form'

import { httpService } from '@/utils/httpService'

export const createProjectReport = ({ project_id, ...data }: FieldValues) => httpService.post(`/api/projects/${project_id}/reports`, data)
