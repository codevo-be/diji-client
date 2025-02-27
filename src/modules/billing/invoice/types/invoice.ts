import { BillingItemType } from '@billing/billing-item/types/BillingItem'

export type InvoiceType = {
    id: number
    identifier?: string
    identifier_number?: number
    status: 'draft' | 'pending' | 'payed' | 'expired'
    issuer?: {
        name: string
        address: string
        vat_number?: string
        iban: string
    }
    date: string
    due_date: string
    payment_date?: string
    structured_communication?: string
    subtotal?: number
    taxes?: Record<string, number>
    total?: number
    contact_id?: number
    contact_name?: string
    vat_number?: string
    email?: string
    phone?: string
    street?: string
    street_number?: string
    city?: string
    zipcode?: string
    country?: string
    items?: BillingItemType[]
}
