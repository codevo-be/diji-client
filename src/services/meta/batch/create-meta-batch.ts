import { MetaType } from 'types/meta.types'

import { HttpService } from '..'

export const createMetaBatch = (data: MetaType[]) => HttpService.post(`/batch`, data)
