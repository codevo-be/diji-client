import { SelectCategory } from '../SelectCategory'

import { Field, Group, Row } from '@/libs/form'
import { SelectClient } from '@/libs/form/SelectClient'
import { SelectCountry } from '@/libs/form/SelectCountry'

export const ProjectFields = () => {
    return (
        <>
            <Group>
                <Row>
                    <Field id="name" name="name" label="Nom" placeholder="Chantier 456" />
                    <SelectClient />
                    <SelectCategory />
                    <Field type="email" id="email" name="email" label="Adresse email" placeholder="lambda@.gmail.com" />
                    <Field id="phone" name="phone" label="Numéro de téléphone" placeholder="0471 23 52 91" />
                    <Field type="date" id="project_start_date" name="project_start_date" label="Date début" />
                    <Field type="date" id="project_start_date" name="project_end_date" label="Date fin" />
                </Row>
            </Group>
            <Group title="Adresse">
                <Row>
                    <Field id="street" name="street" label="Rue" placeholder="Rues des tanneurs" />
                    <Field id="street_number" name="street_number" label="Numéro" placeholder="13" />
                    <Field id="city" name="city" label="Ville" placeholder="Marche-en-Famenne" />
                    <Field id="zipcode" name="zipcode" label="Code postal" placeholder="6900" />
                    <SelectCountry />
                </Row>
            </Group>
        </>
    )
}
