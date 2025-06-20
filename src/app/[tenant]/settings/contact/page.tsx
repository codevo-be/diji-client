'use client'

import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Box, Button, Form, Grid } from '@digico/ui'

import { useImportContact } from '@contact/hooks/mutations/useImportContact'
import { useCreateCsv } from 'hooks/mutations/upload/useCreateCsv'

import { MenuSettings } from '@components/settings/MenuSettings'

export default function Page() {
    const [logs, setLogs] = useState<{ message: string; type: 'success' | 'warning' | 'error'; time: string }[]>([])

    const form = useForm()

    const createCsv = useCreateCsv()
    const importContact = useImportContact()

    const downloadTemplate = () => {
        createCsv.mutate({
            filename: 'template-contact.csv',
            head: ['firstname', 'lastname', 'email', 'phone', 'company_name', 'vat_number', 'iban', 'street', 'street_number', 'city', 'zipcode', 'country'],
            items: []
        })
    }

    const onImportContact = (data: FieldValues) => {
        importContact.mutate(data, {
            onSuccess: (response) => {
                setLogs(response?.logs ?? [])
            }
        })
    }

    return (
        <Grid>
            <Grid.Col column={12}>
                <MenuSettings />
            </Grid.Col>
            <Grid.Col column={6}>
                <Box title="Template pour l'importation des contacts">
                    <p className="text-xs mb-8">{"Importe tous les contacts qui n'existent pas dans votre base de données"}</p>
                    <Button isLoading={createCsv.isPending} onClick={downloadTemplate}>
                        Télécharger le template
                    </Button>
                </Box>
            </Grid.Col>
            <Grid.Col column={6}>
                <Box title="Importation de la template">
                    <Form useForm={form} onSubmit={onImportContact} className="!flex-row !gap-2">
                        <div className="w-full">
                            <Form.Field type="file" name="file" className="!w-full" />
                        </div>
                        <Button isLoading={importContact.isPending} type="submit">
                            Importer
                        </Button>
                    </Form>

                    {logs.length > 0 && (
                        <div className="mt-4 flex flex-col gap-1 max-h-[42rem] overflow-scroll">
                            {logs.map((log, index) => {
                                return (
                                    <p
                                        key={index}
                                        className={`text-xs ${log.type === 'success' ? 'text-success' : log.type === 'warning' ? 'text-warning' : 'text-error'}`}>
                                        {log.time} | {log.message}
                                    </p>
                                )
                            })}
                        </div>
                    )}
                </Box>
            </Grid.Col>
        </Grid>
    )
}
