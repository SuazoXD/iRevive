function requestCode() {
    var authStatus = localStorage.getItem('authStatus');
    if (authStatus === 'ok') {
        // Ya autenticado, no pedir
        return;
    }
    var code = prompt("Por favor, ingresa el código de acceso:");
    if (code === null) {
        document.body.innerHTML = "<h1>Acceso denegado</h1><p>Debes ingresar un código válido para continuar.</p>";
        return;
    }
    if (code === "1234") {
        localStorage.setItem('authStatus', 'ok'); // Guarda para no pedir de nuevo
    } else {
        alert("Código incorrecto. Intenta de nuevo.");
        requestCode(); // Repite
    }
}

// Ejecuta al cargar
requestCode();