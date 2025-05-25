'use client'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import { toast } from 'sonner'

import { useResetPassword } from 'hooks/mutations/auth/useResetPassword'

export const FormResetPassword = ({ token, email }: any) => {
    const router = useRouter()

    const form = useForm({
        defaultValues: {
            token: '',
            email: '',
            password: '',
            password_confirmation: ''
        },
        values: {
            token: String(token),
            email: String(email)
        }
    })

    const resetPassword = useResetPassword()

    const onSubmit = (data: any) => {
        if (data.password !== data.password_confirmation) {
            form.setError('password_confirmation', {
                type: 'manual',
                message: 'La confirmation de mot de passe ne correspondent pas au mot de passe !'
            })
            return
        }

        resetPassword.mutate(data, {
            onSuccess: () => {
                toast.success('Votre mot de passe a bien été réinitialisé !')
                router.push(`/login`)
            }
        })
    }

    return (
        <Form useForm={form} onSubmit={onSubmit}>
            <Form.Field label={'Nouveau mot de passe'} type="password" name="password" placeholder="********" />
            <Form.Field label={'Confirmer le nouveau mot de passe'} type="password" name="password_confirmation" placeholder="********" />

            <Button className="w-full" type="submit" isLoading={resetPassword.isPending}>
                Demander un nouveau mot de passe
            </Button>
        </Form>
    )
}
