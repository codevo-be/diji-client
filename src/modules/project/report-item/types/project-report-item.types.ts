import { z } from 'zod'

import { ProjectReportItemSchema } from '../schemas/project-report-item.schema'

export type ProjectReportItemType = z.infer<typeof ProjectReportItemSchema>
