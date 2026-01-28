const express = require('express');
const app = express();
const PORT = 3000;

// Middleware pour permettre à Express de lire le JSON dans les corps de requêtes (PUT)
app.use(express.json());

// Stockage en mémoire (volatile : s'efface au redémarrage du serveur)
let storedName = null;

// --- ROUTES ---

// 1. GET : Récupérer le message
app.get('/', (req, res) => {
    if (storedName) {
        res.json({ message: `Salut ${storedName}` });
    } else {
        res.json({ message: "Hello World" });
    }
});

// 2. PUT : Stocker ou remplacer le prénom
app.put('/', (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: "Le champ 'name' est requis dans le corps de la requête." });
    }

    storedName = name;
    res.status(201).json({ message: `Le prénom '${storedName}' est enregistré avec succès.` });
});

// 3. DELETE : Supprimer le prénom
app.delete('/', (req, res) => {
    storedName = null;
    res.status(200).json({ message: "Suppression du prénom enregistré." });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`L'API Hello tourne sur http://localhost:${PORT}`);
});