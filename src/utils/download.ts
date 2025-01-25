export function downloadPDF({ base64Data, fileName }: { base64Data: string; fileName: string }) {
    // Decode Base64 data into binary
    const byteCharacters = atob(base64Data);
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob with the PDF MIME type
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    // Create a temporary download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up the DOM
    document.body.removeChild(link);
}
