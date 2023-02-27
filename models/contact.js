const mongoose = require('mongoose');

// creation d'un schema qui génère un objet
const contactSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String, required: true },
    address: { type: String, required: true },
    emailAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    fieldOfWork: { type: String, required: true }
});

// exportation du modèle qu'on appelle 'Contact'
module.exports = mongoose.model('Contact', contactSchema);