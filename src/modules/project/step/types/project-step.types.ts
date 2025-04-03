import { z } from 'zod'

import { ProjectStepSchema } from '../schemas/project-step.schema'

export type ProjectStepType = z.infer<typeof ProjectStepSchema>
