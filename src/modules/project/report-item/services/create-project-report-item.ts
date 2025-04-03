import { FieldValues } from 'react-hook-form'

import { httpService } from '@/utils/httpService'

export const createProjectReportItem = ({ project_id, report_id, ...data }: FieldValues) =>
    httpService.post(`/api/projects/${project_id}/reports/${report_id}/items`, data)
