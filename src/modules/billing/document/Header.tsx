import { useReadMeta } from 'hooks/queries/meta/useReadMeta'
import { CreditNoteType } from '@billing/credit-note/types/credit-note'
import { InvoiceType } from '@billing/invoice/types/invoice'

import { DocumentInfo } from './DocumentInfo'

type Props = {
    data: InvoiceType | CreditNoteType
}

export const Header = ({ data }: Props) => {
    const queryMeta = useReadMeta('tenant_billing_details')
    return (
        <>
            {/* @ts-ignore */}
            {queryMeta.isSuccess ? <img className="h-32 w-auto mb-12" src={String(queryMeta.data?.value?.logo)} alt="Logo" /> : null}

            <div className="flex">
                {/* @ts-ignore */}
                <DocumentInfo {...data?.issuer} />
                {/* @ts-ignore */}
                <DocumentInfo {...data?.recipient} />
            </div>
        </>
    )
}
