import { Box } from '@/libs/Box'
import { BackButton } from '@/libs/button'
import { Grid } from '@/libs/Grid'
import { RemoveSupplier } from '@/modules/supplier/components/removeSupplier'
import { SupplierContactForm } from '@/modules/supplier/components/SupplierContactForm'
import { SupplierUpdateForm } from '@/modules/supplier/components/SupplierUpdateForm'

export default function Page() {
    return (
        <Grid>
            <Grid.Item column={6}>
                <BackButton intent={'text'} />
            </Grid.Item>
            <Grid.Item column={6} className="flex justify-end">
                <RemoveSupplier />
            </Grid.Item>
            <Grid.Item>
                <Box title={'Informations générales'}>
                    <SupplierUpdateForm />
                </Box>
            </Grid.Item>
            <Grid.Item>
                <Box title="Contacts">
                    <SupplierContactForm />
                </Box>
            </Grid.Item>
        </Grid>
    )
}
