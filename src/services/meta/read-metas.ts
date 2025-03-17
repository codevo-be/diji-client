import { MetaType } from 'types/meta.types'

import { HttpService } from '.'

export const readMetas = (keys: string[]) =>
    HttpService.get<{
        data: MetaType
    }>(`/`, keys)
