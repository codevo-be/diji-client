'use client'

import { useParams } from 'next/navigation'

import { useReadCreditNotes } from '@billing/credit-note/hooks/queries'

import { Grid } from '@/libs/Grid'
import { SearchBar } from '@/libs/SearchBar'
import { useSearchQueryParams } from '@/utils/helperService'
import { LoadingQuery } from '@/utils/LoadingQuery'

export default function Page() {
    const { id } = useParams()

    const queryEstimates = useReadCreditNotes({
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
