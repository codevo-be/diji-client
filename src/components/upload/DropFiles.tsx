import { MouseEvent, ReactNode, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

interface DropFilesProps {
    name: string
    accept?: any
}

export default function DropFiles({ name, accept }: DropFilesProps): ReactNode {
    const { watch, setValue, register } = useFormContext()
    const files = watch(name) || [];

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = acceptedFiles.map(file => {
                const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null
                return {
                    file,
                    name: file.name,
                    type: file.type,
                    url: preview,
                }
            })
            setValue(name, [...files, ...newFiles])
        },
        [files, name, setValue]
    )

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept,
        multiple: true,
    })

    const onRemoveFile = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.stopPropagation()
        const updatedFiles = [...files]
        updatedFiles.splice(index, 1)
        setValue(name, updatedFiles)
    }

    return (
        <div className="h-40" {...getRootProps()}>
            <input { ...register('files') } {...getInputProps()} />

            {files.length > 0 ? (
                <div className="h-full relative group cursor-pointer bg-grey-200 rounded border border-grey-400 justify-center hover:border-grey-600 flex flex-col gap-4 items-center">
                    <div className="h-full w-full overflow-x-auto p-4 flex gap-4 items-center justify-center">
                        {files.map((f: any, index: number) => {

                            return (<div key={index} className="h-full relative flex-shrink-0 w-32">
                                <button
                                    type="button"
                                    className="absolute -top-2 -right-2 bg-error rounded-full flex justify-center items-center p-1 transition-all hover:bg-main cursor-pointer"
                                    onClick={(e) => onRemoveFile(e, index)}
                                >
                                    <svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" className="fill-white size-5">
                                        <path d="m813.75 386.25c-17.707-17.707-46.418-17.707-64.125 0l-149.62 149.62-149.62-149.62c-17.707-17.707-46.418-17.707-64.125 0s-17.707 46.418 0 64.125l149.62 149.62-149.62 149.62c-17.707 17.707-17.707 46.418 0 64.125s46.418 17.707 64.125 0l149.62-149.62 149.62 149.62c17.707 17.707 46.418 17.707 64.125 0s17.707-46.418 0-64.125l-149.62-149.62 149.62-149.62c17.707-17.707 17.707-46.418 0-64.125z" />
                                    </svg>
                                </button>

                                    {(() => {
                                        if (f.type.startsWith('image/') && f.url) {
                                            return (
                                                <img
                                                    className="rounded w-full h-32 object-cover object-center"
                                                    src={f.url}
                                                    alt="Preview"
                                                />
                                            );
                                        } else if (f.type === 'application/pdf') {


                                            return (
                                                <div className="flex flex-col items-center justify-center h-32 bg-white border rounded p-2 text-center text-xs">
                                                    <svg className="w-6 h-6 text-red-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm1 0v6h6" />
                                                        <path d="M16 13H8v-2h8v2zM8 17h8v-2H8v2z" />
                                                    </svg>

                                                    <a
                                                        href={f.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline mt-1"
                                                    >
                                                        Voir le PDF
                                                    </a>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div className="flex flex-col items-center justify-center h-32 bg-white border rounded p-2 text-center text-xs">
                                                    <svg className="w-6 h-6 fill-primary mb-2" viewBox="0 0 24 24">
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8zm1 0v6h6" />
                                                        <path d="M16 13H8v-2h8v2zM8 17h8v-2H8v2z" />
                                                    </svg>
                                                    <span className="truncate">{f.name}</span>
                                                </div>
                                            );
                                        }
                                    })()}

                                </div>
                        )})}
                    </div>
                </div>
            ) : (
                <div className="group cursor-pointer bg-grey-200 rounded border border-grey-400 justify-center p-8 hover:border-grey-600 flex flex-col gap-4 items-center">
                    <div className="bg-white aspect-square p-4 rounded shadow">
                        <svg className="w-10 fill-primary" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m892.74 472.22c-8.0625 24.375-2.5312 51.234 14.531 70.406 17.953 20.156 28.734 46.547 28.734 75.609 0 62.812-50.953 113.77-113.77 113.77-19.922 0-36.234 16.125-36.234 36s16.312 36 36.234 36c102.61 0 185.76-83.156 185.76-185.76 0-47.391-17.719-90.609-46.922-123.42 7.125-21.469 10.922-44.25 10.922-67.828 0-129.79-115.5-234.98-258-234.98-92.906 0-174.32 44.719-219.74 111.8-10.5-1.6406-21.281-2.5312-32.25-2.5312-99.75 0-181.18 71.531-185.81 161.34-50.672 33.188-84.188 90.469-84.188 155.63 0 102.61 83.156 185.76 185.76 185.76 19.922 0 36.234-16.125 36.234-36s-16.312-36-36.234-36c-62.812 0-113.77-50.953-113.77-113.77 0-39.844 20.391-74.906 51.609-95.344 19.266-12.609 31.312-33.609 32.484-56.578 2.3906-45.984 46.688-93.047 113.91-93.047 7.2188 0 14.203.60938 20.906 1.6406 27.609 4.4062 55.266-7.5938 70.922-30.703 31.547-46.547 90.234-80.203 160.18-80.203 109.22 0 186 79.172 186 162.98 0 15.75-2.5312 30.891-7.2656 45.234zm-198.89 168.84-57.328-57.328v388.26c0 19.875-16.125 36-36 36-19.922 0-36-16.125-36-36v-388.26l-57.375 57.328c-14.016 14.062-36.844 14.062-50.906 0s-14.062-36.844 0-50.906l69.281-69.281c10.781-10.781 21.281-21.281 31.078-28.781 11.109-8.4375 25.406-16.359 43.922-16.359 18.469 0 32.812 7.9219 43.875 16.359 9.7969 7.5 20.297 18 31.078 28.781l69.281 69.281c14.062 14.062 14.062 36.844 0 50.906s-36.844 14.062-50.906 0z"
                                fillRule="evenodd"
                            />
                        </svg>
                    </div>
                    <p className="text-grey-800 text-center text-xxs font-medium transition-all group-hover:text-main">
                        Télécharger un fichier
                    </p>
                </div>
            )}
        </div>
    )
}
