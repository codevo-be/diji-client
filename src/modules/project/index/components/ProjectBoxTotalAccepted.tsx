import { useReadProjects } from '../hooks/queries/useReadProjects'
import { ProjectType } from '../types/project.types'

import { Box } from '@/libs/Box'
import { EstimateType } from '@/modules/billing/estimate/types/estimate.types'
import { formatCurrency } from '@/utils/helperPricing'
import { useSearchQueryParams } from '@/utils/helperService'

export const ProjectBoxTotalAccepted = () => {
    const queryProjects = useReadProjects({
        ...useSearchQueryParams(),
        with: ['estimates']
    })

    return (
        <Box className="px-10 py-6">
            <p className="text-xs font-medium text-grey-600 whitespace-nowrap mb-4">Total devis acceptés</p>
            <p className="text-md font-bold">
                {queryProjects.isSuccess
                    ? formatCurrency(
                          queryProjects.data.items.reduce((current: number, project: ProjectType & { estimates: EstimateType[] }) => {
                              return (
                                  current +
                                  project.estimates.reduce((current: number, estimate) => {
                                      if (estimate.status !== 'accepted') {
                                          return current
                                      }
                                      return current + (estimate.total ?? 0)
                                  }, 0)
                              )
                          }, 0)
                      )
                    : '...'}
            </p>
        </Box>
    )
}
