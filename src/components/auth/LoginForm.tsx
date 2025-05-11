import { useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { toast } from 'sonner'

import { useLogin } from 'hooks/mutations/auth/useLogin'
import { LoginFormData } from 'types/auth.types'

export const LoginForm = () => {
    const form = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
            remember: false
        }
    })

    const login = useLogin()

    const handleSubmit = (data: LoginFormData) => {
        login.mutate(data, {
            onSuccess: (response: any) => {
                const expires_at = dayjs().add(response.data.expires_in, 'second').add(1, 'hours').toDate()

                Cookies.set('Authorization', response.data.token_type + ' ' + response.data.access_token, {
                    expires: expires_at,
                    sameSite: 'Strict'
                })

                window.location.assign(`/${response.data.tenant.id}`)
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }

    return (
        <Form useForm={form} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Field type="email" id="email" name="email" label="Adresse email" placeholder="info@diji.be" />
                <Form.Field type="password" id="password" name="password" label="Mot de passe" placeholder="********" />

                <div className="flex flex-wrap gap-4 justify-between items-center">
                    <Form.Checkbox id="remember" name="remember" label="Se souvenir de moi" />
                    <Button href="/forgot-password" intent="text" className="text-primary hover:text-primary-active">
                        Mot de passe oublié ?
                    </Button>
                </div>

                <Button isLoading={login.isPending} type="submit" className="w-full">
                    Se connecter
                </Button>
            </Form.Group>
        </Form>
    )
}
