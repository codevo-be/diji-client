import { formatCurrency } from '@digico/utils'

import { SelfInvoiceType } from '@billing/self-invoice/types/self-invoice'

type Props = {
    data: SelfInvoiceType | undefined
}

export const SelfInvoiceFooter = ({ data }: Props) => {
    return (
        data && (
            <div className="mt-40 text-xs">
                <p className="mt-4">
                    Le montant <strong>{formatCurrency(data.total ?? 0)}</strong> sera versé sur le compte {(data.issuer?.iban ?? '').toUpperCase()} par{' '}
                    {data.recipient?.name}
                </p>
                <p className="mt-4">Merci pour votre confiance !</p>
            </div>
        )
    )
}
