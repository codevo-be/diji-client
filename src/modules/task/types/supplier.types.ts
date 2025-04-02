import { z } from 'zod'

import { SupplierSchema } from '../schemas/supplier.schema'

export type SupplierType = z.infer<typeof SupplierSchema>
