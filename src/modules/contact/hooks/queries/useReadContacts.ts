'use client'

import { useQuery } from '@tanstack/react-query'

import { readContacts } from '@contact/services'

export const useReadContacts = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['contacts', { ...params }],
        queryFn: () => readContacts(params)
    })
}
