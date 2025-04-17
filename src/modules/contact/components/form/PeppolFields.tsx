import { Form } from '@digico/ui'

export const PeppolFields = () => {
    return (
        <>
            <Form.Row>
                <Form.Field name={`recipientPeppolIdentifier`} id="recipientPeppolIdentifier" label="Peppol ID" placeholder="9925:be1016227032" />
                <Form.Field name={`changeType`} id="changeType" label="Staut Peppol" placeholder="INVOICE_RECEIVED" />
                <Form.Field name={`peppolFileContent`} id="peppolFileContent" label="Base64" placeholder="PD94bWwgdmVyc2lvbj0iM...." />
                <Form.Field name={`integratorVAT`} id="integratorVAT" label="Integrator VAT" placeholder="BE1016227032" />
                <Form.Field name={`executionTimestamp`} id="executionTimestamp" label="Execution Timestamp" placeholder="2025-04-17 10:29:01" />
            </Form.Row>
        </>
    )
}
