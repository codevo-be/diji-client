'use client'

import { useForm } from 'react-hook-form'
import { Button, Form } from '@digico/ui'
import { Box, ImageBuilder } from '@digico/ui'
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
        <section className="relative h-screen flex">
            <div className="w-full tablet:absolute tablet:top-0 tablet:left-0 tablet:h-full">
                <div className="w-full h-full bg-primary/80">
                    <ImageBuilder className="w-full h-full object-cover relative -z-10" src="/images/auth-background.jpg" />
                </div>
            </div>

            <div className="relative z-10 w-[56rem] flex-shrink-0 flex items-center p-12 tablet:w-full mobile:p-4">
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
        </section>
    )
}
