import { Select } from '@/libs/Select'
import { useReadCategories } from '@/modules/category/hooks/queries/useReadCategories'
import { CategoryType } from '@/modules/category/types/category.types'

export const SelectCategory = () => {
    const { data } = useReadCategories({
        type: 'project'
    })

    return (
        <Select
            label="Type"
            name="category_id"
            placeholder="Type de chantier"
            options={
                data?.items.map((item: CategoryType) => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                }) ?? []
            }>
            <Select.Field />
        </Select>
    )
}
