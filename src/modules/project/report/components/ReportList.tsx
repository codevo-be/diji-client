import { useParams } from 'next/navigation'

import { useReadProjectReports } from '../hooks/queries/useReadProjectReports'

import { ReportTable } from './ReportTable'

import { LoadingQuery } from '@/utils/LoadingQuery'

export const ReportList = () => {
    const { id } = useParams()

    const queryReports = useReadProjectReports(Number(id), {
        with: ['user']
    })

    return (
        <LoadingQuery query={queryReports}>
            {(data) => {
                return <ReportTable items={data.items ?? []} />
            }}
        </LoadingQuery>
    )
}
