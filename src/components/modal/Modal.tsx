'use client'

import React from 'react'
import { Box } from '@digico/ui'
import { Dialog } from 'radix-ui'

import { useModal } from '@components/modal/useModal'

type Props = {
    className?: string
    children: React.ReactNode
}

export const Modal = ({ children }: Props) => {
    const { open, setOpen } = useModal()

    const onClose = () => {
        setOpen(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-main/50 w-full h-full fixed z-10 top-0 left-0" />
                <Dialog.Content className="fixed z-20 top-0 left-0 flex justify-center items-center w-full h-full">
                    <Dialog.Title />
                    <Dialog.Description />
                    <Box className="cursor-default min-w-[46rem]">
                        <Dialog.Close className="mb-8 flex justify-end w-full">
                            <span className="cursor-pointer">Fermer</span>
                        </Dialog.Close>
                        {children}
                    </Box>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
