import { useMutation } from '@tanstack/react-query'

import { login } from 'services/auth/login'

export const useLogin = () => {
    return useMutation({
        mutationFn: login
    })
}
