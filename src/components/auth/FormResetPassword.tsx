'use client'

import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import { toast } from 'sonner'

import { useResetPassword } from 'hooks/mutations/auth/useResetPassword'

// Types pour les props du composant
interface FormResetPasswordProps {
    token: string
    email: string
}

// Types pour les données du formulaire
interface ResetPasswordFormData {
    token: string
    email: string
    password: string
    password_confirmation: string
}

export const FormResetPassword = ({ token, email }: FormResetPasswordProps) => {
    const router = useRouter()

    const form = useForm<ResetPasswordFormData>({
        defaultValues: {
            token: '',
            email: '',
            password: '',
            password_confirmation: ''
        },
        values: {
            token: String(token),
            email: String(email),
            password: '',
            password_confirmation: ''
        }
    })

    const resetPassword = useResetPassword()

    const onSubmit = (data: ResetPasswordFormData) => {
        if (data.password !== data.password_confirmation) {
            toast.error('La confirmation de mot de passe ne correspond pas au mot de passe !')
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
                Réinitialiser le mot de passe
            </Button>
        </Form>
    )
}
