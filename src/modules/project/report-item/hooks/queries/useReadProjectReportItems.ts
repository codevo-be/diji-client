'use client'

import { useQuery } from '@tanstack/react-query'

import { readProjectReportItems } from '../../services/read-project-report-items'

type Props = {
    with?: []
    page?: number
    search?: string
}

export const useReadProjectReportItems = (project_id: number, report_id: number, props?: Props) => {
    return useQuery({
        queryKey: ['project-report-items', { ...props }],
        queryFn: () => readProjectReportItems(project_id, report_id, props)
    })
}
