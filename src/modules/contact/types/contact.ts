export type ContactType = {
    id: number
    display_name: string
    firstname?: string
    lastname?: string
    company_name?: string
    vat_number?: string
    iban?: string
    email: string
    phone?: string
    peppol_identifier?: string
    peppol_type?: 'vat' | 'enterprise'
    billing_address?: {
        street: string
        street_number: string
        city: string
        zipcode: string
        country: string
    }
    percentage: number
}
