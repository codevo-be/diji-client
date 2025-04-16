import { DateHelper, formatCurrency, formatStructuredCommunication } from '@digico/utils'

import { InvoiceType } from '@billing/invoice/types/invoice'

type Props = {
    data: InvoiceType | undefined
}

export const InvoiceFooter = ({ data }: Props) => {
    return (
        data && (
            <div className="mt-40 text-xs">
                <p className="mt-4">
                    Veuillez payer le montant de <strong>{formatCurrency(data.total ?? 0)}</strong> sur le compte <strong>{data.issuer?.iban}</strong> avant le{' '}
                    <strong>{DateHelper.format(data.due_date)}</strong> en mentionnant la référence{' '}
                    <strong>{formatStructuredCommunication(data.structured_communication)}</strong>
                </p>
                <p className="mt-4">Merci pour votre confiance !</p>
            </div>
        )
    )
}
