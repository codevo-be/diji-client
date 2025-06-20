'use client'

import { Box } from '@digico/ui'

import { LoginForm } from 'components/auth/LoginForm'

export default function Index() {
    return (
        <div className="relative overflow-hidden w-full h-full flex flex-col items-center justify-center gap-20 p-20 max-tablet:p-12">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold text-primary">Diji</h1>
                <p className="text-grey-800 text-sm">Votre outil personnel</p>
            </div>

            <Box className="w-full" intent={'info'} size={'default'}>
                <LoginForm />
            </Box>
        </div>
    )
}
