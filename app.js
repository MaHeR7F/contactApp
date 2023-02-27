const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contactApiRoute = require('./routes/api/contactApiRoute');
const contactRoute = require('./routes/contactRoute');

// instancie l'application express
const app = new express();

app.use(express.urlencoded({ extended: true }));

// charge le fichier de configuration
dotenv.config();

// définitie du moteur de rendu
app.set('view engine', 'ejs');

// parse formulaire
app.use(bodyParser.urlencoded({ extended: false}));

// parse  json
app.use(bodyParser.json());

// définie le dossier ou se trouve les vues
app.set('views'. __dirname + 'views');

// supprime le DepreciationWarning
mongoose.set('strictQuery',true);

mongoose.connect(process.env.MONGO_CONNECTION,
{
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// Spécifie les routes :

// indique l'url de départ des routes pour contactApiRoute
app.use("/api", contactApiRoute);

// indique l'url de départ des routes pour contactRoute
app.use("/", contactRoute);

// démarre le serveur sur le port 8099
app.listen(8099, () => {
    console.log('Le serveur est démarré sur le port 8099');
});