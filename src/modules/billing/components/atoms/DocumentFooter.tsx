import { DateHelper, formatCurrency, formatStructuredCommunication } from '@digico/utils'

import { EstimateType } from '@billing/estimate/types/estimate'
import { InvoiceType } from '@billing/invoice/types/invoice'
import { SelfInvoiceType } from '@billing/self-invoice/types/self-invoice'

type Props = {
    data?: EstimateType | InvoiceType | undefined | SelfInvoiceType
    type?: 'invoice' | 'selfinvoice'
}

export const DocumentFooter = ({ data, type }: Props) => {
    const isInvoice = (d: EstimateType | InvoiceType | SelfInvoiceType): d is InvoiceType => {
        return 'structured_communication' in d
    }

    if (!data) {
        return (
            <div className="mt-40 text-xs">
                <p className="mt-4">Merci pour votre confiance !</p>
            </div>
        )
    }

    if (type === 'selfinvoice') {
        return (
            <div className="mt-40 text-xs">
                <p className="mt-4">
                    Le montant <strong>{formatCurrency(data.total ?? 0)}</strong> sera versé sur le compte {(data.issuer?.iban ?? '').toUpperCase()} par{' '}
                    {data.recipient?.name}
                </p>
                <p className="mt-4">Merci pour votre confiance !</p>
            </div>
        )
    }

    if (isInvoice(data)) {
        return (
            <div className="mt-40 text-xs">
                <p className="mt-4">
                    Veuillez payer le montant de <strong>{formatCurrency(data.total ?? 0)}</strong> sur le compte <strong>{data.issuer?.iban}</strong> avant le{' '}
                    <strong>{DateHelper.format(data.due_date)}</strong> en mentionnant la référence{' '}
                    <strong>{formatStructuredCommunication(data?.structured_communication ?? '')}</strong>
                </p>
                <p className="mt-4">Merci pour votre confiance !</p>
            </div>
        )
    }

    return null
}
