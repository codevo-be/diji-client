import { FieldValues } from 'react-hook-form'

import { httpService } from '@/utils/httpService'

export const updateProject = async (data: FieldValues) => httpService.put(`/api/projects/${data.id}`, data)
