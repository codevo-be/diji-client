import { z } from 'zod'

import { ProjectReportSchema } from '../schemas/project-report.schema'

export type ProjectReportType = z.infer<typeof ProjectReportSchema>
