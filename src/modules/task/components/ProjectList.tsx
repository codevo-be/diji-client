import { ProjectTable } from './ProjectTable'

import {useReadProjects} from "@/modules/task/hooks/supplier/queries/useReadProjects";
import { useSearchQueryParams } from '@/utils/helperService'
import { LoadingQuery } from '@/utils/LoadingQuery'

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
