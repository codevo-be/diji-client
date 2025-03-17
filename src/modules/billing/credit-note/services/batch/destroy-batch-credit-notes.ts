import { HttpService } from '..'

export const destroyBatchCreditNotes = async (data: { credit_note_ids: number[] }) => HttpService.delete(`/batch`, data)
