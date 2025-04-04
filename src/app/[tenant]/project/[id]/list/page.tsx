'use client'

import { useParams } from 'next/navigation'

import { Grid } from '@digico/ui'

import { useReadColumns } from '@task/hooks/queries'

import { MenuTask } from '@task/components/MenuTask'

export default function Page() {
    const { id } = useParams()
    const { data } = useReadColumns(Number(id))

    return (
        <Grid>
            <Grid.Col>
                <MenuTask />
            </Grid.Col>
        </Grid>
    )
}
