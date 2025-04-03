'use client'

import { useParams } from 'next/navigation'

import { Grid } from '@/libs/Grid'
import { SearchBar } from '@/libs/SearchBar'
import { InvoiceTable } from '@/modules/billing/invoice/components/InvoiceTable'
import { useReadInvoices } from '@/modules/billing/invoice/hooks/queries/useReadInvoices'
import { ProjectMenu } from '@/modules/project/index/components/ProjectMenu'
import { useSearchQueryParams } from '@/utils/helperService'
import { LoadingQuery } from '@/utils/LoadingQuery'

export default function Page() {
    const { id } = useParams()

    const queryInvoices = useReadInvoices({
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
                <LoadingQuery query={queryInvoices}>
                    {(data) => {
                        return <InvoiceTable items={data.items ?? []} />
                    }}
                </LoadingQuery>
            </Grid.Item>
        </Grid>
    )
}
