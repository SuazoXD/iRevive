function changeTheme(theme) {
    document.body.className = 'theme-' + theme;
    localStorage.setItem('selectedTheme', theme);
    console.log('Tema aplicado: ' + theme); // Depuración
}

window.onload = function() {
    var savedTheme = localStorage.getItem('selectedTheme') || 'rosa';
    changeTheme(savedTheme);
    document.getElementById('theme-selector').value = savedTheme;
};