import { useParams } from 'next/navigation'

import { Summary } from '@billing/document/Summary'

import { useReadEstimate } from '@billing/estimate/hooks/queries'

import { EstimateFooter } from './EstimateFooter'
import { EstimateItemList } from './EstimateItemList'
import { Header } from './Header'

export const EstimateContent = () => {
    const { id } = useParams()
    const { data } = useReadEstimate(Number(id))

    return (
        <>
            <Header />
            <EstimateItemList />
            <Summary data={data} />
            <EstimateFooter data={data} />
        </>
    )
}
