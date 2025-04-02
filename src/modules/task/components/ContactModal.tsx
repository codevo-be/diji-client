import { useParams } from 'next/navigation'

import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useCreateSupplierContact } from '../hooks/contact/mutations/useCreateSupplierContact'

import { SupplierContactFields } from './form/SupplierContactFields'

import { Button } from '@/libs/button'
import { Form } from '@/libs/form'
import { Modal } from '@/libs/Modal'

export const ContactModal = () => {
    const { id } = useParams()
    const form = useForm()

    const mutationContact = useCreateSupplierContact()

    const handleSubmit = (data: FieldValues, handleClose: any) => {
        data.supplier_id = Number(id)
        mutationContact.mutate(data, {
            onSuccess: () => {
                toast.success('Le contact a été ajouté !')
                handleClose()
            }
        })
    }

    return (
        <Modal>
            <Modal.Trigger>
                <div className="flex justify-end mb-12">
                    <Button intent={'grey200'}>Ajouter un contact</Button>
                </div>
            </Modal.Trigger>
            <Modal.Content>
                {({ handleClose }) => {
                    return (
                        <>
                            <Form onSubmit={(data) => handleSubmit(data, handleClose)} useForm={form}>
                                <SupplierContactFields />
                                <Button isLoading={mutationContact.isPending} type="submit">
                                    Ajouter
                                </Button>
                            </Form>
                        </>
                    )
                }}
            </Modal.Content>
        </Modal>
    )
}
