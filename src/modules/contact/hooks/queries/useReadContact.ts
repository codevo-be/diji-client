'use client'

import { useQuery } from '@tanstack/react-query'

import { readContact } from '@contact/services/read-contact'

export const useReadContact = (id: number) => {
    return useQuery({
        queryKey: ['contacts', { id }],
        queryFn: () => readContact(id)
    })
}
