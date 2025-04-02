import { FieldValues } from 'react-hook-form'

import { httpService } from '@/utils/httpService'

export const createContact = (data: FieldValues) => httpService.post(`/api/suppliers/${data.supplier_id}/contacts`, data)
