import { useMutation } from '@tanstack/react-query'

import { resetPassword } from 'services/auth/reset-password'

export const useResetPassword = () => {
    return useMutation({
        mutationFn: resetPassword
    })
}
