const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let events = [
    { id: 1, title: 'Cours', description: 'Courir sur 10 km', user_id: 1 },
    { id: 2, title: 'Danse', description: 'Danser pendant 2 heures', user_id: 2 },
    { id: 3, title: 'Football', description: 'Jouer penadnt 10 minutes', user_id: 3 }
]; // Liste des events

let users = [
    { id: 1, username: 'Fred', password: 'password1' },
    { id: 2, username: 'Jack', password: 'password2' },
    { id: 1, username: 'Albert', password: 'password3' }
]; // Liste de users

// Routes pour les événements
app.get("/events", (req, res) => {
    res.json(events); // Liste de tous les événements
});

app.post("/events", (req, res) => {
    const newEvent = { id: events.length + 1, ...req.body };
    events.push(newEvent);
    res.status(201).json(newEvent); // Création d'un événement
});

app.put("/events/:id", (req, res) => {
    const eventId = parseInt(req.params.id);
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) {
        return res.status(404).json({ error: 'Événement non trouvé' });
    }
    events[eventIndex] = { ...events[eventIndex], ...req.body }; // Mise à jour de l'événement
    res.json(events[eventIndex]);
});

app.delete("/events/:id", (req, res) => {
    const eventId = parseInt(req.params.id);
    events = events.filter(e => e.id !== eventId); // Suppression de l'événement
    res.json({ message: 'Événement supprimé avec succès' });
});

// Routes pour les utilisateurs
app.get("/users", (req, res) => {
    res.json(users); // Liste de tous les utilisateurs
});

app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).json({ error: 'Utilisateur non trouvé' });
});

app.post("/users", (req, res) => {
    const { username, password } = req.body;
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    res.status(201).json(newUser); // Inscription d'un utilisateur
});

app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    users[userIndex] = { ...users[userIndex], ...req.body }; // Mise à jour de l'utilisateur
    res.json(users[userIndex]);
});

app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(u => u.id !== userId); // Suppression de l'utilisateur
    res.json({ message: 'Utilisateur supprimé avec succès' });
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
});