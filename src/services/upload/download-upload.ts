export default async function downloadUpload(url: string, filename: string) {

    const response = await fetch(url,
        {
            method: "GET",
            credentials: "include",
            headers: {
                'X-Disposition': 'attachment'
            }
        })

    if (!response.ok) {
        throw new Error('Erreur lors du téléchargement du fichier');
    }

    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}