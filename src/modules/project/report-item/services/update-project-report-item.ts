import { FieldValues } from 'react-hook-form'

import { httpService } from '@/utils/httpService'

export const updateProjectReportItem = async ({ project_id, report_id, id, ...data }: FieldValues) =>
    httpService.put(`/api/projects/${project_id}/reports/${report_id}/items/${id}`, data)
