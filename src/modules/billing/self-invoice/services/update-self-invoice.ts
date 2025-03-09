import { SelfInvoiceType } from '../types/self-invoice'

import { HttpService } from '.'

export const updateSelfInvoice = async ({ id, ...data }: Partial<Omit<SelfInvoiceType, 'id'>> & { id: SelfInvoiceType['id'] }) =>
    HttpService.put<{
        data: SelfInvoiceType
    }>(`/${id}`, data)
