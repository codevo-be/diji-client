import { FieldValues } from 'react-hook-form'

import { httpService } from '@/utils/httpService'

export const updateSupplier = async (data: FieldValues) => httpService.put(`/api/suppliers/${data.id}`, data)
