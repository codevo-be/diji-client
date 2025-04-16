import { useParams } from 'next/navigation'

import { Summary } from '@billing/document/Summary'

import { useReadEstimate } from '@billing/estimate/hooks/queries'

import { EstimateFooter } from './EstimateFooter'
import { EstimateItemListEditable } from './EstimateItemListEditable'
import { Header } from './Header'
import { ItemManager } from './ItemManager'

export const EstimateContentEditable = () => {
    const { id } = useParams()
    const { data } = useReadEstimate(Number(id))

    return (
        <>
            <Header />
            <EstimateItemListEditable />
            <ItemManager />
            <Summary data={data} />
            <EstimateFooter data={data} />
        </>
    )
}
