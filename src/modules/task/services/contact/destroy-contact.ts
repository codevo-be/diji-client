import { httpService } from '@/utils/httpService'

export const destroyContact = async ({ supplier_id, id }: { supplier_id: number; id: number }) => {
    return httpService.delete(`/api/suppliers/${supplier_id}/contacts/${id}`)
}
