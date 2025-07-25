export interface TenantType {
    id: string
    name: string
    peppol_identifier?: string | null
    settings?: Record<string, any>
}
