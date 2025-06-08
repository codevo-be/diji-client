'use client'

import { useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import { Box } from '@digico/ui'
import { toast } from 'sonner'

import { useForgotPassword } from 'hooks/mutations/auth/useForgotPassword'

type FormType = {
    email: string
}

export default function Index() {
    const form = useForm<FormType>()
    const forogtPassword = useForgotPassword()

    const onSubmit = (data: FormType) => {
        forogtPassword.mutate(data, {
            onSuccess: () => {
                toast.success('Un email vous a été envoyé afin de réinitialiser votre mot de passe.')
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }

    return (
        <div className="relative overflow-hidden w-full h-full flex flex-col items-center justify-center gap-20 p-20 max-tablet:p-12">
            <Box className="w-full flex flex-col items-center">
                <div className="w-full">
                    <h2 className="font-bold text-lg mb-8">Mot de passe oublié ?</h2>
                    <Form useForm={form} onSubmit={onSubmit}>
                        <Form.Field label={'Adresse email'} name="email" placeholder="lambda@gmail.com" type="email" required={true} />

                        <Button className="w-full" type="submit" isLoading={forogtPassword.isPending}>
                            Demander un nouveau mot de passe
                        </Button>
                    </Form>
                </div>

                <Button href="/login" intent={'text'} className="text-center">
                    Je connais mon mot de passe
                </Button>
            </Box>
        </div>
    )
}
