import { useAuth } from '@/contexts/AuthContext'
import { Menu } from '@/libs/Menu'
import { routes } from '@/utils/route'

export const ProjectsMenu = () => {
    const { workspace } = useAuth()

    return (
        <Menu
            links={[
                {
                    href: routes.workspace.project.index(workspace.slug),
                    label: 'Projets',
                    active: true
                },
                {
                    href: routes.workspace.project.category.index(workspace.slug),
                    label: 'Catégories'
                } /* ,
                {
                    href: routes.workspace.project.advancement.index(workspace.slug),
                    label: 'Avancement'
                } */
            ]}
        />
    )
}
