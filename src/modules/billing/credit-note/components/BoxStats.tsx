import { Box, Tag, useQueryParams } from '@digico/ui'
import { formatCurrency } from '@digico/utils'
import { months } from 'data/date'

import { useReadCreditNotes } from '../hooks/queries'

import { CREDIT_NOTE_STATUSES } from '../data/credit-note-statuses'

export const BoxStats = () => {
    const params = useQueryParams()

    const queryCreditNotes = useReadCreditNotes({
        month: params.month,
        status: params.status ?? ''
    })

    return (
        <Box size="sm" isLoading={queryCreditNotes.isLoading}>
            <div className="flex gap-4 mb-6">
                {params.month && (
                    <Tag className="text-primary">
                        {
                            months.filter((month) => {
                                return month.value === Number(params.month)
                            })[0].label
                        }
                    </Tag>
                )}

                {params.status && (
                    <Tag className={`text-${CREDIT_NOTE_STATUSES[params.status as keyof typeof CREDIT_NOTE_STATUSES].color}`}>
                        {CREDIT_NOTE_STATUSES[params.status as keyof typeof CREDIT_NOTE_STATUSES].label}
                    </Tag>
                )}
            </div>

            <p className="text-grey-600 text-sm">{queryCreditNotes.data?.data.length} factures</p>
            <h2 className="font-bold text-xl">
                {formatCurrency(
                    queryCreditNotes.data?.data.reduce((current, item) => {
                        return current + (item.total ?? 0)
                    }, 0) ?? 0
                )}
            </h2>
        </Box>
    )
}
