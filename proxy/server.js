const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4000;

// Configuration CORS
app.use(cors());

// Page d'accueil personnalisée
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head><title>Accueil - Vertikal IA</title></head>
        <body style="font-family: Arial; text-align: center; margin-top: 5rem;">
            <h1>Bienvenue sur Vertikal IA</h1>
            <p>
                <a href="/exam" style="font-size:1.5rem; margin:2rem;">Examen Blanc</a> |
                <a href="/flashcards" style="font-size:1.5rem; margin:2rem;">Flash Cards</a>
            </p>
        </body>
        </html>
    `);
});

// Sert le build de Exam_blancV1 sur /exam
app.use('/exam', express.static(path.join(__dirname, '../Exam_blancV1/build')));
app.get('/exam/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Exam_blancV1/build/index.html'));
});

// Sert le build de flashcardsv2 sur /flashcards
app.use('/flashcards', express.static(path.join(__dirname, '../flashcardsv2/build')));
app.get('/flashcards/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../flashcardsv2/build/index.html'));
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error('Erreur proxy:', err);
    res.status(500).send('Erreur de proxy');
});

app.listen(port, () => {
    console.log('=================================');
    console.log(`Serveur proxy (PROD) démarré sur http://localhost:${port}`);
    console.log('=================================');
    console.log('Accueil : http://localhost:4000/');
    console.log('Examens blancs : http://localhost:4000/exam');
    console.log('Flashcards : http://localhost:4000/flashcards');
    console.log('=================================');
}); 