import { z } from 'zod'

import { SupplierContactSchema } from '../schemas/contact.schema'

export type SupplierContactType = z.infer<typeof SupplierContactSchema>
