export type ExpenseType = {
    id: number
    document_identifier: string
    document_type: 'INVOICE' | 'CREDIT_NOTE'
    sender: {
        name: string
        vatNumber: string
    }
    recipient: {
        name: string
        vatNumber: string
    }
    sender_address: {
        city: string
        line1: string
        country: string
        zipCode: string
    }
    recipient_address: {
        city: string
        line1: string
        country: string
        zipCode: string
    }
    issue_date: string
    due_date: string
    currency: string
    total: number
    subtotal: number
    taxes: {
        total: string
    }
    structured_communication: string
    lines: {
        name: string
        price: number
        quantity: number
    }[]
    raw_xml: string
    created_at: string
    updated_at: string
}
