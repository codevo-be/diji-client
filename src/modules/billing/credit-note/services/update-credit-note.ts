import { CreditNoteType } from '../types/credit-note'

import { HttpService } from '.'

export const updateCreditNote = async ({ id, ...data }: Partial<Omit<CreditNoteType, 'id'>> & { id: CreditNoteType['id'] }) =>
    HttpService.put<{
        data: CreditNoteType
    }>(`/${id}`, data)
