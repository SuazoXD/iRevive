function requestCode() {
    var code = prompt("Por favor, ingresa el código de acceso:");
    if (code === null) {
        document.body.innerHTML = "<h1>Acceso denegado</h1><p>Debes ingresar un código válido para continuar.</p>";
        return;
    }
    if (code === "1234") {
        // Código correcto, la página ya está cargada
    } else {
        alert("Código incorrecto. Intenta de nuevo.");
        requestCode(); // Repite hasta que sea correcto o cancelen
    }
}

// Ejecuta al cargar
requestCode();