import { useParams } from 'next/navigation'

import { ESTIMATE_STATUS_DRAFT } from '@billing/estimate/data/estimate-statuses'

import { useReadEstimate } from '@billing/estimate/hooks/queries'

import { BillingDocument } from '@billing/components/organisms/BillingDocument'

import { EstimateContent } from '../molecules/EstimateContent'
import { EstimateContentEditable } from '../molecules/EstimateContentEditable'

export const DocumentEstimate = () => {
    const { id } = useParams()
    const { data } = useReadEstimate(Number(id))

    if (data?.status === ESTIMATE_STATUS_DRAFT) {
        return (
            <BillingDocument data={data}>
                <EstimateContentEditable />
            </BillingDocument>
        )
    }

    return (
        <BillingDocument data={data}>
            <EstimateContent />
        </BillingDocument>
    )
}
