import { useReadMeta } from 'hooks/queries/meta/useReadMeta'
import { CreditNoteType } from '@billing/credit-note/types/credit-note'
import { InvoiceType } from '@billing/invoice/types/invoice'

import { DocumentInfo } from './DocumentInfo'

type Props = {
    data: InvoiceType | CreditNoteType
}

export const Header = ({ data }: Props) => {
    const queryMeta = useReadMeta('tenant_logo')

    return (
        <>
            {queryMeta.isSuccess && queryMeta.data?.value ? <img className="h-32 w-auto mb-12" src={String(queryMeta.data?.value)} alt="Logo" /> : null}

            <div className="flex">
                {/* @ts-ignore */}
                <DocumentInfo {...data?.issuer} />
                {/* @ts-ignore */}
                <DocumentInfo {...data?.recipient} />
            </div>
        </>
    )
}
