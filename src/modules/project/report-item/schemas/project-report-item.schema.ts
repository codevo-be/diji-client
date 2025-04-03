import { z } from 'zod'

export const ProjectReportItemSchema = z.object({
    id: z.number(),
    order: z.number(),
    content: z.string(),
    date: z.string(),
    project_report_id: z.number()
})

export const ProjectReportItemsSchema = z.array(ProjectReportItemSchema)
