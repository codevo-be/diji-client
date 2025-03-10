import { MetaType } from 'types/meta.types'

import { HttpService } from '.'

export const readMeta = (key: string) =>
    HttpService.get<{
        data: MetaType
    }>(`/${key}`).then((response) => response.data)
