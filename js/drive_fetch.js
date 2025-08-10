// ===== CONFIGURACIÓN =====
const CONFIG = {
    API_KEY: "AIzaSyBa8R_eevuse9eicappxw2hr4lHHUpK72k",
    DRIVE_FOLDER_IDS: [
        "1ToBUTJXyxNWO4pwoCsDHDUU5uRoX97zw", // Carpeta 1
        "1ZbUkUjKSAl9fc3Ud3HdY66aR8QIE4Yv4"  // Carpeta 2
    ]
};

// ===== FUNCIÓN PARA OBTENER ARCHIVOS DE UNA CARPETA =====
async function fetchDriveFiles(folderId) {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${CONFIG.API_KEY}&fields=files(id,name,mimeType,webViewLink,webContentLink)`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.files || data.files.length === 0) {
            console.log(`No hay archivos en la carpeta: ${folderId}`);
            return [];
        }

        return data.files;
    } catch (error) {
        console.error(`Error obteniendo archivos de la carpeta ${folderId}:`, error);
        return [];
    }
}

// ===== FUNCIÓN PRINCIPAL PARA OBTENER DE TODAS LAS CARPETAS =====
async function fetchAllDriveFiles() {
    let allFiles = [];

    for (let folderId of CONFIG.DRIVE_FOLDER_IDS) {
        const files = await fetchDriveFiles(folderId);
        allFiles = allFiles.concat(files);
    }

    return allFiles;
}

// ===== EJEMPLO DE USO =====
fetchAllDriveFiles().then(files => {
    console.log("Archivos obtenidos:", files);
});
