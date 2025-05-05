'use client'

import { useQuery } from '@tanstack/react-query'

import { readTenant } from 'services/tenant'

export const useReadTenant = () => {
    return useQuery({
        queryKey: ['tenant'],
        queryFn: readTenant
    })
}
