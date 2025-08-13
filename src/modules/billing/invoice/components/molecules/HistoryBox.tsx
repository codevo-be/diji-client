import { useParams } from 'next/navigation'

import { Box, Grid } from '@digico/ui'
import { DateHelper } from '@digico/utils'

import { useReadHistories } from 'modules/history/hooks/queries'

export const HistoryBox = () => {
    const { id } = useParams()
    const { data, isSuccess } = useReadHistories({
        model_type: 'invoice',
        model_id: Number(id)
    })

    if (!isSuccess) {
        return null
    }

    if (data.data.length === 0) {
        return null
    }

    return (
        <Grid.Col>
            <Box title="Historique">
                <ul className="flexf lex-col gap-2 text-xs text-grey-800">
                    {data.data.map((history) => (
                        <li key={history.id} className={`${history.type === 'success' ? 'text-success' : 'text-error'}`}>
                            {DateHelper.format(history.created_at, 'DD/MM/YY HH:mm')} : {history.message}
                        </li>
                    ))}
                </ul>
            </Box>
        </Grid.Col>
    )
}
