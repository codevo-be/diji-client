'use client'

import { Box, Button } from '@digico/ui'

import { FormResetPassword } from '@components/auth/FormResetPassword'

export default function Index({ searchParams }: any) {
    const token = searchParams.token ?? ''
    const email = searchParams.email ?? ''

    return (
        <div className="relative overflow-hidden w-full h-full flex flex-col items-center justify-center gap-20 p-20 max-tablet:p-12">
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
    )
}
