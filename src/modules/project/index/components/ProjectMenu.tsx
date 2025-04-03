import { useParams, usePathname } from 'next/navigation'

import { useAuth } from '@/contexts/AuthContext'
import { Menu } from '@/libs/Menu'
import { routes } from '@/utils/route'

export const ProjectMenu = () => {
    const { id } = useParams()
    const { workspace } = useAuth()
    const pathname = usePathname()

    return (
        <Menu
            links={[
                {
                    href: routes.workspace.project.index(workspace.slug),
                    label: '← Retour'
                },
                {
                    active: pathname === routes.workspace.project.edit.index(workspace.slug, Number(id)),
                    href: routes.workspace.project.edit.index(workspace.slug, Number(id)),
                    label: 'Général'
                },
                {
                    active: pathname.includes('report'),
                    href: routes.workspace.project.edit.report.index(workspace.slug, Number(id)),
                    label: 'Rapports'
                },
                {
                    active: pathname === routes.workspace.project.edit.estimate.index(workspace.slug, Number(id)),
                    href: routes.workspace.project.edit.estimate.index(workspace.slug, Number(id)),
                    label: 'Devis'
                },
                {
                    active: pathname === routes.workspace.project.edit.invoice.index(workspace.slug, Number(id)),
                    href: routes.workspace.project.edit.invoice.index(workspace.slug, Number(id)),
                    label: 'Factures'
                },
                {
                    active: pathname === routes.workspace.project.edit.creditNote.index(workspace.slug, Number(id)),
                    href: routes.workspace.project.edit.creditNote.index(workspace.slug, Number(id)),
                    label: 'Notes de crédit'
                }
            ]}
        />
    )
}
