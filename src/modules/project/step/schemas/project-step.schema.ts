import { z } from 'zod'

export const ProjectStepSchema = z.object({
    id: z.number(),
    name: z.string(),
    value: z.number(),
    category_id: z.number()
})

export const ProjectStepsSchema = z.array(ProjectStepSchema)
