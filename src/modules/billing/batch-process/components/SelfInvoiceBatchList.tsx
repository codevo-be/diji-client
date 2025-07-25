'use client'

import Link from 'next/link'

import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { SELF_INVOICE_STATUSES } from '@billing/self-invoice/data/self-invoice-statuses'
import { Box, Button, Form, Grid, Table, Tag, useQueryParams } from '@digico/ui'
import { formatCurrency } from '@digico/utils'
import clsx from 'clsx'

import { useDestroyBatchSelfInvoices } from '@billing/self-invoice/hooks/mutations/batch/useDestroyBatchSelfInvoices'
import useDownloadBatchSelfInvoice from '@billing/self-invoice/hooks/mutations/batch/useDownloadBatchSelfInvoice'
import { useUpdateBatchSelfInvoices } from '@billing/self-invoice/hooks/mutations/batch/useUpdateBatchSelfInvoices'
import { useReadSelfInvoices } from '@billing/self-invoice/hooks/queries'
import { SelfInvoiceType } from '@billing/self-invoice/types/self-invoice'

import { useAuth } from 'helpers/auth-context/useAuth'

export const SelfInvoiceBatchList = () => {
    const { tenant, user } = useAuth()
    const [errors, setErrors] = useState(null)

    const querySelfInvoices = useReadSelfInvoices(useQueryParams())
    const destroySelfInvoices = useDestroyBatchSelfInvoices()
    const updateBatchSelfInvoices = useUpdateBatchSelfInvoices()
    const downloadBatchSelfInvoice = useDownloadBatchSelfInvoice()

    const form = useForm()

    const formList = useForm<{
        invoices: string[]
    }>({
        values: {
            invoices: querySelfInvoices.data?.data.map((invoice) => String(invoice.id)) ?? []
        }
    })

    const onChangeAll = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        const invoices = querySelfInvoices.data?.data ?? []
        const invoiceCount = invoices.length
        const invoiceSelectedCount = formList.watch('invoices').length

        let data: string[] = []

        if (invoiceSelectedCount < invoiceCount) {
            data = invoices.map((invoice) => String(invoice.id))
        }

        formList.setValue('invoices', data)
    }

    const onSubmit = (data: FieldValues) => {
        updateBatchSelfInvoices.mutate(
            {
                self_invoice_ids: formList.watch('invoices').map((id) => Number(id)),
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
        destroySelfInvoices.mutate({
            self_invoice_ids: formList.watch('invoices').map((id) => Number(id))
        })
    }

    const onDownload = () => {
        downloadBatchSelfInvoice.mutate(
            {
                email: user.email,
                ids: formList.watch('invoices').map((id) => Number(id))
            },
            {
                onSuccess: (data) => {
                    const skippedIds = data.errors
                    if (Object.keys(skippedIds).length > 0) {
                        setErrors(skippedIds)
                    }
                }
            }
        )
    }

    return (
        <>
            <Grid.Col column={8}>
                <Form useForm={formList}>
                    <Table items={querySelfInvoices.data?.data ?? []}>
                        <Table.Head>
                            <Form.Checkbox defaultChecked={true} name="all" onClick={onChangeAll} id="all" />
                        </Table.Head>
                        <Table.Head>ID</Table.Head>
                        <Table.Head>Numéro de facture</Table.Head>
                        <Table.Head>Expéditeur</Table.Head>
                        <Table.Head>Destinataire</Table.Head>
                        <Table.Head>Date</Table.Head>
                        <Table.Head>Sous-total</Table.Head>
                        <Table.Head>Total</Table.Head>

                        <Table.Col>
                            {({ id }: SelfInvoiceType) => {
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
                        <Table.Col name="issuer.name" />
                        <Table.Col name="recipient.name" />
                        <Table.Col>
                            {(invoice: SelfInvoiceType) => {
                                return invoice.date
                            }}
                        </Table.Col>
                        <Table.Col>
                            {(invoice: SelfInvoiceType) => {
                                return formatCurrency(invoice.subtotal ?? 0)
                            }}
                        </Table.Col>
                        <Table.Col>
                            {(invoice: SelfInvoiceType) => {
                                return formatCurrency(invoice.total ?? 0)
                            }}
                        </Table.Col>
                        <Table.Col>
                            {(invoice: SelfInvoiceType) => {
                                const status = SELF_INVOICE_STATUSES[invoice.status]

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
                                        <Form.Select name="status" label="Nouveau statut" options={Object.values(SELF_INVOICE_STATUSES)} />
                                    </Grid.Col>
                                    <Grid.Col className="flex flex-col gap-2">
                                        <span className="text-xs text-center text-grey-800 mb-2">
                                            {formList.watch('invoices').length} facture(s) sélectionnées
                                        </span>
                                        <Button type="submit" className="w-full" isLoading={updateBatchSelfInvoices.isPending}>
                                            Appliquer les modifications
                                        </Button>
                                        <Button
                                            type={'button'}
                                            intent={'grey200'}
                                            className={'w-full'}
                                            isLoading={downloadBatchSelfInvoice.isPending}
                                            onClick={onDownload}>
                                            Télécharger
                                        </Button>
                                        <Button type="button" className="w-full" intent={'error'} onClick={onDestroy} isLoading={destroySelfInvoices.isPending}>
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
                                                        href={`/${tenant.id}/billing/self-invoice/${id}`}>
                                                        Facture : #{id}
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
