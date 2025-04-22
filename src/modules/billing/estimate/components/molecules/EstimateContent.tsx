import { useParams } from 'next/navigation'

import { useReadEstimate, useReadEstimateItems } from '@billing/estimate/hooks/queries'

import { DocumentFooter } from '@billing/components/atoms/DocumentFooter'
import { DocumentSummary } from '@billing/components/molecules/DocumentSummary'
import { DocumentItems } from '@billing/components/organisms/DocumentItems'

import { DocumentEstimateHeader } from './DocumentEstimateHeader'

export const EstimateContent = () => {
    const { id } = useParams()
    const { data } = useReadEstimate(Number(id))

    const queryEstimateItem = useReadEstimateItems(Number(id))

    return (
        <>
            <DocumentEstimateHeader />
            <DocumentItems items={queryEstimateItem.data?.data ?? []} />
            <DocumentSummary data={data} />
            <DocumentFooter />
        </>
    )
}
