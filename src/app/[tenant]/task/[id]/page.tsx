import { Box, Grid } from '@digico/ui'

import { RemoveSupplier } from '@tasks/components/removeSupplier'
import { SupplierContactForm } from '@tasks/components/SupplierContactForm'
import { SupplierUpdateForm } from '@tasks/components/SupplierUpdateForm'

export default function Page() {
    return (
        <Grid>
            <Grid.Col column={6}>
                {/*<BackButton intent={'text'} />*/} {/*todo: trouver comment c'est géré*/}
            </Grid.Col>
            <Grid.Col column={6} className="flex justify-end">
                <RemoveSupplier />
            </Grid.Col>
            <Grid.Col>
                <Box title={'Informations générales'}>
                    <SupplierUpdateForm />
                </Box>
            </Grid.Col>
            <Grid.Col>
                <Box title="Contacts">
                    <SupplierContactForm />
                </Box>
            </Grid.Col>
        </Grid>
    )
}
