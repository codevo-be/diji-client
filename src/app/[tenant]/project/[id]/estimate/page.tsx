'use client'

import { useParams } from 'next/navigation'

import { useReadEstimates } from '@/modules/billing/estimate/hooks/queries/useReadEstimates'

import { EstimateTable } from '@/modules/billing/estimate/components/EstimateTable'
import { ProjectMenu } from '@/modules/project/index/components/ProjectMenu'

import { Grid } from '@/libs/Grid'
import { SearchBar } from '@/libs/SearchBar'
import { useSearchQueryParams } from '@/utils/helperService'
import { LoadingQuery } from '@/utils/LoadingQuery'

export default function Page() {
    const { id } = useParams()

    const queryEstimates = useReadEstimates({
        ...useSearchQueryParams(),
        where: {
            project_id: Number(id)
        }
    })

    return (
        <Grid>
            <Grid.Item column={6}>
                <ProjectMenu />
            </Grid.Item>
            <Grid.Item column={6} className="flex justify-end">
                <SearchBar />
            </Grid.Item>
            <Grid.Item>
                <LoadingQuery query={queryEstimates}>
                    {(data) => {
                        return <EstimateTable items={data.items ?? []} />
                    }}
                </LoadingQuery>
            </Grid.Item>
        </Grid>
    )
}
