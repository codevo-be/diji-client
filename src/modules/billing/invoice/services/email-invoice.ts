import { FieldValues } from 'react-hook-form'

import { HttpService } from '.'

export const emailInvoice = async ({ id, ...data }: FieldValues) => HttpService.post(`/${id}/email`, data)
