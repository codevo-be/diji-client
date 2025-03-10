import { CreditNoteType } from '@billing/credit-note/types/credit-note'
import { InvoiceType } from '@billing/invoice/types/invoice'

import { DocumentInfo } from './DocumentInfo'

type Props = {
    data: InvoiceType | CreditNoteType
}

export const Header = ({ data }: Props) => {
    return (
        <>
            <div className="flex">
                {/* @ts-ignore */}
                <DocumentInfo {...data?.issuer} />
                {/* @ts-ignore */}
                <DocumentInfo {...data?.recipient} />
            </div>
        </>
    )
}
