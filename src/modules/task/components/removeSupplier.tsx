'use client'

import { useParams, useRouter } from 'next/navigation'

import { toast } from 'sonner'

import { useDestroySupplier } from '../hooks/supplier/mutations/useDestroySupplier'

import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/libs/button'
import { routes } from '@/utils/route'

type Props = {
    className?: string
}

export const RemoveSupplier = ({ className }: Props) => {
    const { id } = useParams()
    const { workspace } = useAuth()
    const router = useRouter()

    const mutationSupplier = useDestroySupplier()

    const handleRemove = () => {
        mutationSupplier.mutate(Number(id), {
            onSuccess: () => {
                router.push(routes.workspace.supplier.index(workspace.slug))
                toast.success('Le fournisseur a été supprimé !')
            }
        })
    }

    return (
        <Button isLoading={mutationSupplier.isPending} className={className} onClick={handleRemove} intent="error">
            Supprimer
        </Button>
    )
}
