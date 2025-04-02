import { Field } from '../../form'

export const TaskFields = () => {
    return (
        <>
            <Field required={true} id="title" name="title" label="Titre" placeholder="Task 2" />
            <Field type="textarea" id="content" name="content" label="Contenu" placeholder="Description ici" rows={5} />
            <Field type="number" id="sum" name="sum" label="Montant" placeholder="25,00" suffixe="€" />
        </>
    )
}
