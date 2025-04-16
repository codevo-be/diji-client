import { HttpRequestBuilder } from '@digico/utils'

export const HttpService = new HttpRequestBuilder(String(process.env.NEXT_PUBLIC_API_URL) + '/api/estimates')

export * from './create-estimate'
export * from './destroy-estimate'
export * from './item/index'
export * from './read-estimate'
export * from './read-estimates'
export * from './update-estimate'
