import { HttpRequestBuilder } from '@digico/utils'

export const HttpService = new HttpRequestBuilder(String(process.env.NEXT_PUBLIC_API_URL) + '/api/uploads')

export * from './create-upload'
export * from './delete-upload'
export * from './get-item-uploads'