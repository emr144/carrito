const express = require('express');
const app = express();
const path = require('path');

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta para enviar el archivo JSON
app.get('/api/productos', (req, res) => {
    res.sendFile(path.join(__dirname, 'productos.json'));
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
