import { DateHelper, formatCurrency } from '@digico/utils'

import { SelfInvoiceType } from '@billing/self-invoice/types/self-invoice'

type Props = {
    data: SelfInvoiceType | undefined
}

export const SelfInvoiceFooter = ({ data }: Props) => {
    return (
        data && (
            <div className="mt-40 text-xs">
                <p className="mt-4">
                    Veuillez payer le montant de <strong>{formatCurrency(data.total ?? 0)}</strong> sur le compte {data.issuer?.iban} avant le{' '}
                    {DateHelper.format(data.due_date)} en mentionnant la référence {data.structured_communication}
                </p>
                <p className="mt-4">Merci de votre confiance !</p>
            </div>
        )
    )
}
