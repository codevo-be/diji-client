import { Field, Group, Row } from '@/libs/form'

export const ReportItemFields = () => {
    return (
        <Group>
            <Row>
                <Field type="date" name="date" label="Date du rapport" id="date" />
            </Row>
            <Field rows={5} type="textarea" name="content" label="Description" id="content" placeholder="Rédiger le rapport" />
        </Group>
    )
}
