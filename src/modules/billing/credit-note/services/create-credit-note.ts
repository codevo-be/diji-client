import { CreditNoteType } from '../types/credit-note'

import { HttpService } from '.'

export const createCreditNote = async (data: Partial<Omit<CreditNoteType, 'id'>>) =>
    HttpService.post<{
        data: CreditNoteType
    }>(`/`, data)
