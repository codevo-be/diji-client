import { CreditNoteType } from '../types/credit-note'

import { HttpService } from '.'

export const updateCreditNote = async ({ id, ...data }: Partial<Omit<CreditNoteType, 'id'>> & { id: CreditNoteType['id'] }) => {
    if (data.contact_id === -1) { // Vérifie si le code est celui de la création.
        data.contact_id = undefined;
    }

    return HttpService.put<{
        data: CreditNoteType
    }>(`/${id}`, data)
}
