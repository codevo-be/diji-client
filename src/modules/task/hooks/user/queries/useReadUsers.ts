'use client'

import { useQuery } from '@tanstack/react-query'

import { readUsers } from '@task/services/user/read-users'

export const useReadUsers = (params?: Record<string, any>) => {
    return useQuery({
        queryKey: ['users', { ...params }],
        queryFn: () => readUsers(params),
        placeholderData: (previousData) => previousData
    })
}
