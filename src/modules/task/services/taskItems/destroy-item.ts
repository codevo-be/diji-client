import { HttpService } from '@task/services/taskItems/index'

export const destroyItem = async (id: number) => HttpService.delete(`/${id}`)
