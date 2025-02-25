'use client'

import { Button, Grid, PageHeader, QuerySearchBar } from '@digico/ui'

import { useReadContacts } from '@contact/hooks/queries'

import { ContactTable } from '@contact/components/ContactTable'

export default function Page() {
    const queryContacts = useReadContacts()

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
            </Grid.Col>
        </Grid>
    )
}
