import { z } from 'zod'

export const ProjectReportSchema = z.object({
    id: z.number(),
    name: z.string(),
    user_id: z.number(),
    project_id: z.number()
})

export const ProjectReportsSchema = z.array(ProjectReportSchema)
