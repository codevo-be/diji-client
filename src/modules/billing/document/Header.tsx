import { InvoiceType } from '@billing/invoice/types/invoice'

import { DocumentInfo } from './DocumentInfo'

type Props = {
    data: InvoiceType
}

export const Header = ({ data }: Props) => {
    return (
        <>
            <div className="flex">
                {/* @ts-ignore */}
                <DocumentInfo {...data?.issuer} />
                {/* @ts-ignore */}
                <DocumentInfo {...data} name={data?.contact_name} />
            </div>
        </>
    )
}
