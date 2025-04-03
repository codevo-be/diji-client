import { z } from 'zod'

import { ProjectSchema } from '../schemas/project.schema'

export type ProjectType = z.infer<typeof ProjectSchema>
