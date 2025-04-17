'use client'

import { Grid, QuerySearchBar, useQueryParams } from '@digico/ui'

import { useReadEstimates } from '@billing/estimate/hooks/queries'

import { ButtonCreateEstimate } from '@billing/estimate/components/molecules/ButtonCreateEstimate'
import { EstimateTable } from '@billing/estimate/components/organisms/EstimateTable'
import { MenuInvoice } from '@billing/invoice/components/MenuInvoice'
import { Paginate } from '@helpers/Paginate'

export default function Page() {
    const queryEstimates = useReadEstimates({
        page: 1,
        ...useQueryParams()
    })

    return (
        <Grid>
            <Grid.Col>
                <div className="flex justify-between gap-12">
                    <MenuInvoice />
                    <div className="flex gap-2 flex-shrink-0">
                        <QuerySearchBar />
                        <ButtonCreateEstimate />
                    </div>
                </div>
            </Grid.Col>
            <Grid.Col>
                <EstimateTable items={queryEstimates.data?.data ?? []} />
                <Paginate className="mt-12" paginate={queryEstimates.data?.meta} />
            </Grid.Col>
        </Grid>
    )
}
