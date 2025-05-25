'use client'

import { Box, Button, ImageBuilder } from '@digico/ui'

import { FormResetPassword } from '@components/auth/FormResetPassword'

export default function Index({ searchParams }: any) {
    const token = searchParams.token ?? ''
    const email = searchParams.email ?? ''

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
                        <h2 className="font-bold text-lg mb-8">Réinitialiser le mot de passe</h2>
                        <FormResetPassword token={token} email={email} />
                    </div>

                    <Button href="/login" intent={'text'} className="text-center">
                        Je connais mon mot de passe
                    </Button>
                </Box>
            </div>
        </section>
    )
}
