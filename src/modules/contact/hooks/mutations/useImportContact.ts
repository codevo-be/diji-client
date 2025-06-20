import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { importContact } from '@contact/services/import-contact'

export const useImportContact = () => {
    return useMutation({
        mutationFn: importContact,
        onError: (error) => {
            toast.error(error.message)
        }
    })
}
