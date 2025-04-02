import { z } from 'zod'

export const ProjectSchema = z.object({
    id: z.number(),
    name: z.string(),
    identifier: z.string().max(255),
    identifier_number: z.number().min(1),
    customer_id: z.number(),
    company_id: z.number(),
    contact_name: z.string(),
    email: z.string().email(),
    phone: z.string().nullable(),
    street: z.string(),
    street_number: z.string(),
    city: z.string(),
    zipcode: z.string(),
    country: z.string(),
    project_start_date: z.string(),
    project_end_date: z.string()
})

export const ProjectsSchema = z.array(ProjectSchema)
