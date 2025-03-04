import { BillingItemType } from '@billing/billing-item/types/BillingItem'

export type CreditNoteType = {
    id: number
    identifier?: string
    identifier_number?: number
    invoice_id?: number
    issuer?: {
        name: string
        vat_number?: string
        street: string
        street_number: string
        city: string
        zipcode: string
        country: string
        iban: string
    }
    date: string
    status: 'draft' | 'pending' | 'refund'
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
