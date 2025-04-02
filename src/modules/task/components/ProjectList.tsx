import { useQueryParams } from '@digico/ui'

import { useReadProjects } from '@tasks/hooks/supplier/queries/useReadProjects'

import { ProjectTable } from './ProjectTable'

export const ProjectList = () => {
    const queryProjects = useReadProjects(useQueryParams()) // todo: vérifier que ca fonctionne, avant c'était avec ...useQueryParams()

    return <ProjectTable items={queryProjects.data?.items ?? []} />
}
