'use client'

import { useQuery } from '@tanstack/react-query'

import { readRegisterToken } from 'services/auth/read-register-token'

export const useReadRegisterToken = (token?: string) => {
    return useQuery({
        queryKey: ['registration-token', token],
        queryFn: () => readRegisterToken(token!),
    })
}
