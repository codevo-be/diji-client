'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Grid } from '@/libs/Grid'
import { Menu } from '@/libs/Menu'
import { routes } from '@/utils/route'

export default function Home() {
    const { workspace } = useAuth()

    return (
        <Grid>
            <Grid.Item column={6}>
                <Menu
                    links={[
                        {
                            href: routes.workspace.project.index(workspace.slug),
                            label: 'Projets'
                        },
                        {
                            href: routes.workspace.project.category.index(workspace.slug),
                            label: 'Catégories'
                        },
                        {
                            href: routes.workspace.project.advancement.index(workspace.slug),
                            label: 'Avancement',
                            active: true
                        }
                    ]}
                />
            </Grid.Item>
        </Grid>
    )
}
