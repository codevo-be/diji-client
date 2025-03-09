import { SelfInvoiceType } from '../types/self-invoice'

import { HttpService } from '.'

export const createSelfInvoice = async (data: Partial<Omit<SelfInvoiceType, 'id'>>) =>
    HttpService.post<{
        data: SelfInvoiceType
    }>(`/`, data)
