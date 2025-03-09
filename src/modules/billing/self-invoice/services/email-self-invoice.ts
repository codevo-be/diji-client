import { FieldValues } from 'react-hook-form'

import { HttpService } from '.'

export const emailSelfInvoice = async ({ id, ...data }: FieldValues) => HttpService.post(`/${id}/email`, data)
