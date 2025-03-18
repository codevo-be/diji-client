import { BillingItemType } from '@billing/billing-item/types/BillingItem'

export type CreditNoteType = {
    id: number
    identifier?: string
    identifier_number?: number
    invoice_id?: number
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
        email?: string
        phone?: string
        street: string
        street_number: string
        city: string
        zipcode: string
        country: string
    }
    contact_id?: number
    date: string
    status: 'draft' | 'pending' | 'refund'
    subtotal?: number
    taxes?: Record<string, number>
    total?: number
    items?: BillingItemType[]
}
