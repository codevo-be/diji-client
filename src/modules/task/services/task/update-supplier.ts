import { FieldValues } from 'react-hook-form'

import { HttpService } from '@tasks/services/task/index'

export const updateSupplier = async (data: FieldValues) => HttpService.put(`/api/suppliers/${data.id}`, data)
