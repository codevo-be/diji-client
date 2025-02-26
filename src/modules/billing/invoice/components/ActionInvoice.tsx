import { Box, Grid } from '@digico/ui'

import { ButtonDownload } from './ButtonDownload'

export const ActionInvoice = () => {
    return (
        <Box>
            <Grid>
                <Grid.Col>
                    <div className="mt-4 flex gap-2">
                        <ButtonDownload className="flex-1" />
                    </div>
                </Grid.Col>
            </Grid>
        </Box>
    )
}
