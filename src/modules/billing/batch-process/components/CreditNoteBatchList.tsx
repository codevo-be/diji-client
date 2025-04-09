import Link from 'next/link'

import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { CREDIT_NOTE_STATUSES } from '@billing/credit-note/data/credit-note-statuses'
import { Box, Button, Form, Grid, Table, Tag, useQueryParams } from '@digico/ui'
import { formatCurrency } from '@digico/utils'
import clsx from 'clsx'

import { useDestroyBatchCreditNotes } from '@billing/credit-note/hooks/mutations/batch/useDestroyBatchCreditNotes'
import useDownloadBatchCreditNotes from '@billing/credit-note/hooks/mutations/batch/useDownloadBatchCreditNotes'
import { useUpdateBatchCreditNotes } from '@billing/credit-note/hooks/mutations/batch/useUpdateBatchCreditNotes'
import { useReadCreditNotes } from '@billing/credit-note/hooks/queries'
import { CreditNoteType } from '@billing/credit-note/types/credit-note'

import { useAuth } from 'helpers/auth-context/useAuth'

export const CreditNoteBatchList = () => {
    const { tenant } = useAuth()
    const [errors, setErrors] = useState(null)

    const queryCreditNotes = useReadCreditNotes(useQueryParams())
    const destroyBatchCreditNotes = useDestroyBatchCreditNotes()
    const updateBatchCreditNotes = useUpdateBatchCreditNotes()
    const downloadBatchCreditsNotes = useDownloadBatchCreditNotes();

    const form = useForm()

    const formList = useForm<{
        invoices: string[]
    }>({
        values: {
            invoices: queryCreditNotes.data?.data.map((invoice) => String(invoice.id)) ?? []
        }
    })

    const onChangeAll = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        const invoices = queryCreditNotes.data?.data ?? []
        const invoiceCount = invoices.length
        const invoiceSelectedCount = formList.watch('invoices').length

        let data: string[] = []

        if (invoiceSelectedCount < invoiceCount) {
            data = invoices.map((invoice) => String(invoice.id))
        }

        formList.setValue('invoices', data)
    }

    const onSubmit = (data: FieldValues) => {
        updateBatchCreditNotes.mutate(
            {
                credit_note_ids: formList.watch('invoices').map((id) => Number(id)),
                data
            },
            {
                onError: (error: any) => {
                    setErrors(error.errors)
                }
            }
        )
    }

    const onDestroy = () => {
        destroyBatchCreditNotes.mutate({
            credit_note_ids: formList.watch('invoices').map((id) => Number(id))
        })
    }

    const onDownload = () => {
        downloadBatchCreditsNotes.mutate({
            ids: formList.watch('invoices').map((id) => Number(id))
        })
    }

    return (
        <>
            <Grid.Col column={8}>
                <Form useForm={formList}>
                    <Table items={queryCreditNotes.data?.data ?? []}>
                        <Table.Head>
                            <Form.Checkbox defaultChecked={true} name="all" onClick={onChangeAll} id="all" />
                        </Table.Head>
                        <Table.Head>ID</Table.Head>
                        <Table.Head>Numéro de facture</Table.Head>
                        <Table.Head>Client</Table.Head>
                        <Table.Head>Date</Table.Head>
                        <Table.Head>Sous-total</Table.Head>
                        <Table.Head>Total</Table.Head>

                        <Table.Col>
                            {({ id }: CreditNoteType) => {
                                return (
                                    <Form.Checkbox
                                        intent="notext"
                                        name={`invoices`}
                                        value={String(id)}
                                        defaultChecked={formList.watch('invoices').includes(String(id)) ? true : false}
                                        id={String(id)}
                                        key={String(id) + '-' + (formList.watch('invoices').includes(String(id)) ? 'checked' : 'unchecked')}
                                    />
                                )
                            }}
                        </Table.Col>

                        <Table.Col name="id" />
                        <Table.Col name="identifier" />
                        <Table.Col name="recipient.name" />
                        <Table.Col>
                            {(invoice: CreditNoteType) => {
                                return invoice.date
                            }}
                        </Table.Col>
                        <Table.Col>
                            {(invoice: CreditNoteType) => {
                                return formatCurrency(invoice.subtotal ?? 0)
                            }}
                        </Table.Col>
                        <Table.Col>
                            {(invoice: CreditNoteType) => {
                                return formatCurrency(invoice.total ?? 0)
                            }}
                        </Table.Col>
                        <Table.Col>
                            {(invoice: CreditNoteType) => {
                                const status = CREDIT_NOTE_STATUSES[invoice.status]

                                return (
                                    <Tag className={clsx(`text-${status.color}`)} size={'xs'}>
                                        {status.label}
                                    </Tag>
                                )
                            }}
                        </Table.Col>
                    </Table>
                </Form>
            </Grid.Col>
            <Grid.Col column={4}>
                <Grid>
                    <Grid.Col>
                        <Box>
                            <Form useForm={form} onSubmit={onSubmit}>
                                <Grid>
                                    <Grid.Col>
                                        <Form.Select name="status" label="Nouveau statut" options={Object.values(CREDIT_NOTE_STATUSES)} />
                                    </Grid.Col>
                                    <Grid.Col className="flex flex-col gap-2">
                                        <span className="text-xs text-center text-grey-800 mb-2">
                                            {formList.watch('invoices').length} facture(s) sélectionnées
                                        </span>
                                        <Button type="submit" className="w-full" isLoading={updateBatchCreditNotes.isPending}>
                                            Appliquer les modifications
                                        </Button>
                                        <Button type={'button'} intent={'grey200'} className={'w-full'} isLoading={downloadBatchCreditsNotes.isPending} onClick={onDownload} >
                                            Télécharger
                                        </Button>
                                        <Button
                                            type="button"
                                            className="w-full"
                                            intent={'error'}
                                            onClick={onDestroy}
                                            isLoading={destroyBatchCreditNotes.isPending}>
                                            Supprimer
                                        </Button>
                                    </Grid.Col>
                                </Grid>
                            </Form>
                        </Box>
                    </Grid.Col>
                    {errors && (
                        <Grid.Col>
                            <Box title="Erreurs sur les factures" intent="error" className="text-error border border-error">
                                <ul>
                                    {Object.keys(errors).map((id) => {
                                        return (
                                            <li key={id}>
                                                <p className="text-sm">
                                                    <Link
                                                        className="underline transition-all hover:font-semibold"
                                                        href={`/${tenant.id}/billing/credit-note/${id}`}>
                                                        Note de credit : #{id}
                                                    </Link>
                                                </p>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Box>
                        </Grid.Col>
                    )}
                </Grid>
            </Grid.Col>{' '}
        </>
    )
}
