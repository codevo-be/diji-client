'use client'

import { useForm } from 'react-hook-form'
import { Box, Button, Form, Grid, PageHeader } from '@digico/ui'

import { useCreatePeppol } from '@contact/hooks/mutations/useCreatePeppol'
import { PeppolType } from '@contact/types/peppol'

import { PeppolFields } from '@contact/components/form/PeppolFields'

export default function Page() {
    const form = useForm<PeppolType>()
    const createPeppol = useCreatePeppol()

    const handleSubmit = (data: PeppolType) => {
        console.log('handleSubmit', data)

        createPeppol.mutate(data, {
            onSuccess: () => {
                return
            }
        })
    }

    return (
        <Grid>
            <Grid.Col>
                <PageHeader>Peppol TESTER</PageHeader>
            </Grid.Col>
            <Grid.Col>
                <Box>
                    <Form useForm={form} onSubmit={handleSubmit}>
                        <PeppolFields />
                        <Button isLoading={createPeppol.isPending} type="submit">
                            Tester Peppol
                        </Button>
                    </Form>
                </Box>
            </Grid.Col>
        </Grid>
    )
}
