'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/libs/button'
import { Grid } from '@/libs/Grid'
import { Menu } from '@/libs/Menu'
import { SearchBar } from '@/libs/SearchBar'
import { CategoryList } from '@/modules/category/components/CategoryList'
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
                            label: 'Catégories',
                            active: true
                        } /* w */
                    ]}
                />
            </Grid.Item>
            <Grid.Item column={6}>
                <div className="flex gap-4 justify-end">
                    <SearchBar />
                    <Button href="category/create">Ajouter une catégorie</Button>
                </div>
            </Grid.Item>
            <Grid.Item>
                <CategoryList />
            </Grid.Item>
        </Grid>
    )
}
