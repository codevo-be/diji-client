import { useParams } from 'next/navigation'

import { useReadProjectHistory } from '../hooks/queries/useReadProjectHistory'

import { Box } from '@/libs/Box'
import { HistoryList } from '@/modules/history/components/HistoryList'

export const ProjectHistory = () => {
    const { id } = useParams()
    const { data } = useReadProjectHistory(Number(id))

    return (
        <Box title="Historique">
            <HistoryList items={data?.items ?? []} />
        </Box>
    )
}
