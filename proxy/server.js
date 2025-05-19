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
        <head><title>Bienvenue sur AriaSchool</title></head>
        <body style="font-family: Arial; text-align: center; margin-top: 5rem;">
            <h1 style="font-size:2.5rem; margin-bottom:1rem;">Bienvenue sur AriaSchool</h1>
            <h2 style="font-size:1.3rem; font-weight:normal; margin-bottom:2.5rem; color:#444;">Révisez vos partiels Albert School de Finance, Économie, Stratégie, Marketing et Cybersécurité.</h2>
            <p style="margin-bottom:2.5rem;">
                <a href="/exam" style="font-size:1.5rem; margin:2rem; color:#fff; background:#007bff; padding:0.7rem 2rem; border-radius:6px; text-decoration:none;">Examen Blanc</a>
                <a href="/flashcards" style="font-size:1.5rem; margin:2rem; color:#fff; background:#28a745; padding:0.7rem 2rem; border-radius:6px; text-decoration:none;">Flash Cards</a>
            </p>
            <p style="color:#b22222; font-size:1rem; max-width:600px; margin:2rem auto 0 auto;">
                Il s'agit d'une version bêta ouverte du Mercredi 19 Mai 2025 au Mercredi 26 Mai 2025 de 9h à 23h sauf jours de partiel, certaines erreurs peuvent survenir. Si une erreur apparaît avec le webhook, réessayez deux fois. Si l'erreur persiste, c'est que je ne suis pas en ligne.
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