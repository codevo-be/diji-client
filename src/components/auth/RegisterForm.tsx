'use client'

import { useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import { toast } from 'sonner'

import { useRegister } from 'hooks/mutations/auth/useRegister'
import { RegisterFormData } from 'types/auth.types'

export const RegisterForm = () => {
    const form = useForm<RegisterFormData>({
        defaultValues: {
            email: '',
            password: '',
            company: ''
        }
    })

    const register = useRegister()

    const handleSubmit = (data: RegisterFormData) => {
        register.mutate(data, {
            onSuccess: (response: any) => {
                toast.success('Inscription réussie, veuillez vous connecter.')
                window.location.assign('/login')
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
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
