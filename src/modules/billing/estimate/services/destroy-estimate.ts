import { HttpService } from '.'

export const destroyEstimate = async (id: number) => HttpService.delete(`/${id}`)
