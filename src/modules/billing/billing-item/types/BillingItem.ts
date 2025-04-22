export type BillingItemType = {
    id: number
    position: number
    name: string
    quantity?: number
    vat?: number
    cost?: {
        subtotal: number
        tax?: number
        total?: number
    }
    retail?: {
        subtotal: number
        tax?: number
        total?: number
    }
}
