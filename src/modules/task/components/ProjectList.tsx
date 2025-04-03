import { useQueryParams } from '@digico/ui'

import { useReadProjects } from '@projects/index/hooks/queries/useReadProjects'

import { ProjectTable } from './ProjectTable'


export const ProjectList = () => {
    const queryProjects = useReadProjects({
        ...useQueryParams()
    })

    return (
        <ProjectTable items={queryProjects.data.items} />
    )
}
