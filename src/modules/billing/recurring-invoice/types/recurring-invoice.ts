import { BillingItemType } from '@billing/billing-item/types/BillingItem'

export type RecurringInvoiceType = {
    id: number
    status: 'draft' | 'active' | 'inactive'
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
    start_date: string
    frequency: string
    next_run_at: string
    subtotal?: number
    taxes?: Record<string, number>
    total?: number
    items?: BillingItemType[]
}
