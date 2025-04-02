
import { ProjectTable } from './ProjectTable'

import { useSearchQueryParams } from '@/utils/helperService'
import { LoadingQuery } from '@/utils/LoadingQuery'
import { useReadProjects } from '@tasks/hooks/supplier/queries/useReadProjects'

export const ProjectList = () => {
    const queryProjects = useReadProjects({
        ...useSearchQueryParams()
    })

    return (
        <LoadingQuery query={queryProjects}>
            {(data) => {
                return <ProjectTable items={data.items} />
            }}
        </LoadingQuery>
    )
}
