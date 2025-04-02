import { z } from 'zod'

export const SupplierSchema = z.object({
    id: z.number(),
    name: z.string(),
    vat_number: z.string(),
    email: z.string().email(),
    phone: z.string().nullable(),
    street: z.string().nullable(),
    street_number: z.string().nullable(),
    city: z.string().nullable(),
    zipcode: z.string().nullable(),
    country: z.string().nullable()
})

export const SuppliersSchema = z.array(SupplierSchema)
