'use client'

import { useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import { toast } from 'sonner'

import { useRegister } from 'hooks/mutations/auth/useRegister'
import { useReadRegisterToken } from 'hooks/queries/auth/useReadRegisterToken'
import { RegisterFormData } from 'types/auth.types'

interface RegisterFormProps {
    token?: string
}

export const RegisterForm = ({ token }: RegisterFormProps) => {
    const { data, isLoading, isError, error } = useReadRegisterToken(token)

    const form = useForm<RegisterFormData>({
        defaultValues: {
            email: data?.email ?? '',
            password: '',
            company: ''
        }
    })

    const register = useRegister()

    const handleSubmit = (formData: RegisterFormData) => {
        if (!token) return

        register.mutate(
            { ...formData, token },
            {
                onSuccess: () => {
                    toast.success('Inscription réussie, veuillez vous connecter.')
                    window.location.assign('/login')
                },
                onError: (err) => {
                    toast.error(err.message || 'Une erreur est survenue.')
                }
            }
        )
    }

    if (isLoading) {
        return <div>Vérification du lien</div>
    }

    if (isError) {
        return <p className="text-center text-red-600 text-sm">{error?.message || 'Ce lien est invalide ou expiré.'}</p>
    }

    return (
        <Form useForm={form} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Field type="text" id="company" name="company" label="Nom de la société" placeholder="Ma société" />
                <Form.Field type="email" id="email" name="email" label="Adresse email" placeholder="info@diji.be" />
                <Form.Field type="password" id="password" name="password" label="Mot de passe" placeholder="********" />

                <Button isLoading={register.isPending} type="submit" className="w-full">
                    S’enregistrer
                </Button>
            </Form.Group>
        </Form>
    )
}
