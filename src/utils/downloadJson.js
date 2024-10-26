export function downloadJson(data) {
    // Prompt the user for a file name
    const fileName = window.prompt('Enter a name for your file', 'user_data');

    // If the user cancels or provides no input, do nothing
    if (!fileName) {
        return;
    }

    // Convert the data to a JSON string
    const json = JSON.stringify(data, null, 2);

    // Create a blob from the JSON data
    const blob = new Blob([json], { type: 'application/json' });

    // Create a temporary link element to initiate the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.json`;

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up the temporary link
    URL.revokeObjectURL(link.href);
}
