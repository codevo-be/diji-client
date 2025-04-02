'use client'

import { useParams } from 'next/navigation'

import { useDestroySupplierContact } from '../hooks/contact/mutations/useDestroySupplierContact'
import { useReadSupplier } from '../hooks/supplier/queries/useReadSupplier'
import { SupplierContactType } from '../types/contact.types'

import { ContactModal } from './ContactModal'

import { Icon } from '@/components/Icon'
import { Table } from '@/libs/Table'
import { LoadingQuery } from '@/utils/LoadingQuery'

export const SupplierContactForm = () => {
    const { id } = useParams()

    const querySupplier = useReadSupplier(Number(id), {
        with: ['contacts']
    })

    const mutationContact = useDestroySupplierContact()

    const handleRemove = (contact_id: number) => {
        mutationContact.mutate({
            supplier_id: Number(id),
            id: contact_id
        })
    }

    return (
        <>
            <ContactModal />
            <LoadingQuery query={querySupplier}>
                {(supplier) => {
                    return (
                        //@ts-ignore
                        <Table items={supplier.contacts ?? []}>
                            <Table.Head>Nom</Table.Head>
                            <Table.Head>Adresse email</Table.Head>
                            <Table.Head>Numéro de téléphone</Table.Head>
                            <Table.Head />
                            <Table.Item name="fullname" />
                            <Table.Item name="email" />
                            <Table.Item name="phone" />
                            <Table.Item className="flex justify-end">
                                {(contact: SupplierContactType) => {
                                    return (
                                        <button
                                            onClick={() => handleRemove(contact.id)}
                                            type="button"
                                            className="rounded-sm bg-grey-200 p-4 transition-all hover:bg-error group">
                                            <Icon className="size-4 fill-grey-800 transition-all group-hover:fill-white" name="cross" />
                                        </button>
                                    )
                                }}
                            </Table.Item>
                        </Table>
                    )
                }}
            </LoadingQuery>
        </>
    )
}
