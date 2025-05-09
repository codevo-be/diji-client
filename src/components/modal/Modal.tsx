'use client'

import { Box } from '@digico/ui'
import clsx from 'clsx'
import { Dialog } from 'radix-ui'

import { Icon } from '@components/Icon'
import { useModal } from '@components/modal/useModal'

type Props = {
    className?: string
    children: React.ReactNode
}

export const Modal = ({ className, children }: Props) => {
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
                    <Box className={clsx('relative px-20 py-16', className)}>
                        <Dialog.Close className="cursor-pointer absolute top-4 right-4 rounded-full border border-grey-600 p-2 text-grey-800 transition-all hover:border-main hover:text-main outline-0">
                            <Icon name={"cross"} className={"w-5 h-5"} />
                        </Dialog.Close>
                        {children}
                    </Box>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}