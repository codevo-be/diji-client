import { SupplierRelations } from '../../schemas/relation.schema'
import { SupplierSchema } from '../../schemas/supplier.schema'

import { httpService } from '@/utils/httpService'

type Props = {
    with?: ['contacts']
}

export const readSupplier = async (id: number, params?: Props) => {
    const relations = params?.with ?? []

    const data = await httpService.get(`/api/suppliers/${id}`, params)
    const schema = relations.reduce((schema, relation) => schema.extend({ [relation]: SupplierRelations[relation] }), SupplierSchema)

    return schema.parse(data.item)
}
