import { useReadProjects } from '../hooks/queries/useReadProjects'
import { ProjectType } from '../types/project.types'

import { Box } from '@/libs/Box'
import { InvoiceType } from '@/modules/billing/invoice/types/invoice.types'
import { formatCurrency } from '@/utils/helperPricing'
import { useSearchQueryParams } from '@/utils/helperService'

export const ProjectBoxTotalPayed = () => {
    const queryProjects = useReadProjects({
        ...useSearchQueryParams(),
        with: ['invoices']
    })

    return (
        <Box className="px-10 py-6">
            <p className="text-xs font-medium text-grey-600 whitespace-nowrap mb-4">Total facturé</p>
            <p className="text-md font-bold">
                {queryProjects.isSuccess
                    ? formatCurrency(
                          queryProjects.data.items.reduce((current: number, project: ProjectType & { invoices: InvoiceType[] }) => {
                              return (
                                  current +
                                  project.invoices.reduce((current: number, invoice) => {
                                      if (invoice.status !== 'payed') {
                                          return current
                                      }
                                      return current + (invoice.total ?? 0)
                                  }, 0)
                              )
                          }, 0)
                      )
                    : '...'}
            </p>
        </Box>
    )
}
