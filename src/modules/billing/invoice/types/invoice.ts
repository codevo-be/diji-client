import { BillingItemType } from '@billing/billing-item/types/BillingItem'

export type InvoiceType = {
    id: number
    identifier?: string
    identifier_number?: number
    status: 'draft' | 'pending' | 'payed' | 'expired'
    issuer?: {
        name: string
        vat_number?: string
        iban: string
        phone?: string
        email?: string
        street: string
        street_number: string
        city: string
        zipcode: string
        country: string
    }
    recipient?: {
        name: string
        vat_number?: string
        street: string
        street_number: string
        city: string
        zipcode: string
        country: string
    }
    contact_id?: number
    date: string
    due_date: string
    payment_date?: string
    structured_communication?: string
    subtotal?: number
    taxes?: Record<string, number>
    total?: number
    items?: BillingItemType[]
}
