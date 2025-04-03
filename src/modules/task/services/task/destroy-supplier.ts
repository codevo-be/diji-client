import { HttpService } from '@tasks/services/task/index'

export const destroySupplier = async (id: number) => HttpService.delete(`/api/suppliers/${id}`)
