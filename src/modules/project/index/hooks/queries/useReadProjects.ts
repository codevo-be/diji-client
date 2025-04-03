'use client'

import { useQuery } from '@tanstack/react-query'

import { readProjects } from '../../services/read-projects'

type Props = {
    with?: ['invoices' | 'estimates']
    page?: number
    search?: string
    where?: {
        customer_id?: number
        company_id?: number
    }
}

export const useReadProjects = (props?: Props) => {
    return useQuery({
        queryKey: ['projects', { ...props }],
        queryFn: () => readProjects(props)
    })
}
