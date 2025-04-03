import { FieldValues } from 'react-hook-form'

import { HttpService } from '@projects/index/services/index'


export const updateProject = async (data: FieldValues) => HttpService.put(`/api/projects/${data.id}`, data)
