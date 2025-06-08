import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { resetPassword } from 'services/auth/reset-password'

export const useResetPassword = () => {
    return useMutation({
        mutationFn: resetPassword,
        onError: (error) => {
            toast.error(error.message)
        }
    })
}
