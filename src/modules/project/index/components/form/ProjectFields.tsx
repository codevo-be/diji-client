import { Form } from '@digico/ui'
import { SelectCategory } from '../SelectCategory'
import { Group } from '@digico/ui/dist/types/components/Form/Group'
import { Row } from '@digico/ui/dist/types/components/Form/Row'
import { SelectCountry } from '../../../../../libs/SelectCountry'

export const ProjectFields = () => {
    return (
        <>
            <Group>
                <Row>
                    <Form.Field id="name" name="name" label="Nom" placeholder="Chantier 456" />
                    {/*<SelectClient />*/} {/*todo: vérifier si on sélectionne les clients */}
                    <SelectCategory />
                    <Form.Field type="email" id="email" name="email" label="Adresse email" placeholder="lambda@.gmail.com" />
                    <Form.Field id="phone" name="phone" label="Numéro de téléphone" placeholder="0471 23 52 91" />
                    <Form.Field type="date" id="project_start_date" name="project_start_date" label="Date début" />
                    <Form.Field type="date" id="project_start_date" name="project_end_date" label="Date fin" />
                </Row>
            </Group>
            <Group title="Adresse">
                <Row>
                    <Form.Field id="street" name="street" label="Rue" placeholder="Rues des tanneurs" />
                    <Form.Field id="street_number" name="street_number" label="Numéro" placeholder="13" />
                    <Form.Field id="city" name="city" label="Ville" placeholder="Marche-en-Famenne" />
                    <Form.Field id="zipcode" name="zipcode" label="Code postal" placeholder="6900" />
                    <SelectCountry />
                </Row>
            </Group>
        </>
    )
}
