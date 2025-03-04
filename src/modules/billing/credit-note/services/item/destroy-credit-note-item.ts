import { HttpService } from './..'

export const destroyCreditNoteItem = async (credit_note_id: number, id: number) => HttpService.delete(`/${credit_note_id}/items/${id}`)
