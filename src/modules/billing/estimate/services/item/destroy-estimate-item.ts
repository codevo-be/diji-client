import { HttpService } from '..'

export const destroyEstimateItem = async (estimate_id: number, id: number) => HttpService.delete(`/${estimate_id}/items/${id}`)
