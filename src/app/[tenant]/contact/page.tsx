'use client'

import { Button, Grid, PageHeader, QuerySearchBar, useQueryParams } from '@digico/ui'

import { useReadContacts } from '@contact/hooks/queries'

import { ContactTable } from '@contact/components/ContactTable'
import { Paginate } from '@helpers/Paginate'

export default function Page() {
    const queryContacts = useReadContacts({
        page: 1,
        ...useQueryParams()
    })

    return (
        <Grid>
            <Grid.Col>
                <div className="flex justify-between">
                    <PageHeader>Contacts</PageHeader>
                    <div className="flex gap-2 flex-shrink-0">
                        <QuerySearchBar />
                        <Button href={'contact/create'}>Ajouter un client</Button>
                    </div>
                </div>
            </Grid.Col>
            <Grid.Col>
                {/* @ts-ignore */}
                <ContactTable items={queryContacts.data?.data ?? []} />
                <Paginate className="mt-12" paginate={queryContacts.data?.meta} />
            </Grid.Col>
        </Grid>
    )
}
