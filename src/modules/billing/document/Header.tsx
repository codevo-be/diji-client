import { useReadTenant } from '../../../hooks/queries/tenant/useReadTenant'
import { CreditNoteType } from '@billing/credit-note/types/credit-note'
import { InvoiceType } from '@billing/invoice/types/invoice'
import { RecurringInvoiceType } from '@billing/recurring-invoice/types/recurring-invoice'

import { DocumentInfo } from './DocumentInfo'

type Props = {
    data: InvoiceType | CreditNoteType | RecurringInvoiceType
}

export const Header = ({ data }: Props) => {
    const queryTenant = useReadTenant()

    return (
        <>
            {/* @ts-ignore */}
            {queryTenant.isSuccess ? <img className="h-32 max-w-[24rem] object-contain mb-12" src={String(queryTenant.data?.data.settings?.logo)} alt="Logo" /> : null}

            <div className="flex">
                {/* @ts-ignore */}
                <DocumentInfo {...data?.issuer} />
                {/* @ts-ignore */}
                <DocumentInfo {...data?.recipient} />
            </div>
        </>
    )
}
