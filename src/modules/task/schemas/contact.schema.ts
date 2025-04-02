import { z } from 'zod'

export const SupplierContactSchema = z.object({
    id: z.number(),
    fullname: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    phone: z.string().nullable()
})

export const SupplierContactsSchema = z.array(SupplierContactSchema)
