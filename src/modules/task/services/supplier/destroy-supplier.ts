import { httpService } from '@/utils/httpService'

export const destroySupplier = async (id: number) => httpService.delete(`/api/suppliers/${id}`)
