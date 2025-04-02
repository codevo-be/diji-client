import { Form } from '@digico/ui'

export const SettingsBrevoFields = () => {
    return (
        <>
            <Form.Group>
                <Form.Row>
                    <Form.Field label="Nom de l'éxpéditeur" name="sender.name" id="sender.name" placeholder="Diji" />
                    <Form.Field label="Adresse email de l'éxpéditeur" name="sender.email" id="sender.email" placeholder="info@diji.be" />
                </Form.Row>
                <Form.Field type="password" label="Clé API" name="api_key" id="api_key" placeholder="xkeysi***" />
            </Form.Group>
        </>
    )
}
