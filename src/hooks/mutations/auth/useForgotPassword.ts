import { useMutation } from '@tanstack/react-query'

import { forgotPassword } from 'services/auth/forgot-password'

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: forgotPassword
    })
}
