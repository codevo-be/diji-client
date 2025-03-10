export interface MetaType {
    model_type?: string
    model_id?: number
    key: string
    value: string | Record<string, unknown>
    type: 'string' | 'integer' | 'float' | 'boolean' | 'json' | 'file'
}
