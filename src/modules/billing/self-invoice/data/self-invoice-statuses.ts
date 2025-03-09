export const SELF_INVOICE_STATUSES = {
    draft: {
        label: 'Brouillon',
        value: 'draft',
        color: 'grey'
    },
    pending: {
        label: 'En attente de paiement',
        value: 'pending',
        color: 'primary'
    },
    payed: {
        label: 'Payé',
        value: 'payed',
        color: 'success'
    },
    expired: {
        label: 'Expiré',
        value: 'expired',
        color: 'error'
    }
}

export const SELF_INVOICE_STATUS_DRAFT = 'draft'
export const SELF_INVOICE_STATUS_PENDING = 'pending'
export const SELF_INVOICE_STATUS_PAYED = 'payed'
export const SELF_INVOICE_STATUS_EXPIRED = 'expired'
