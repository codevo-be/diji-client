'use client'

import { useQuery } from '@tanstack/react-query'

import { readContacts } from '@contact/services'

export const useReadContacts = () => {
    return useQuery({
        queryKey: ['contacts'],
        queryFn: readContacts
    })
}
