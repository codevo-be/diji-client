import { MetaType } from 'types/meta.types'

import { HttpService } from '.'

export const updateOrCreateMeta = ({ key, ...data }: MetaType) => HttpService.put(`/${key}`, data)
