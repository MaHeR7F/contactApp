const express = require('express');
const router = express.Router();
const Contact = require('../../models/contact');

// route : localhost:port/api/contacts
router.route("/contacts")

    .get((req, res) => {
        // récupère tous les objets
        Contact.find()
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json(error))
    });

// route : localhost:port/api/
router.route("/contact/:id")

    .get((req,res) => {
        Contact.findOne({_id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error))
    })

    .put((req,res) => {
        Contact.updateOne({_id: req.params.id}, req.body)
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error))
    })

    .delete((req,res) => {
        Contact.deleteOne({_id: req.params.id})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(400).json(error))
    })

// route pour ajouter un contact
router.route('/contact')

    .post((req, res) => {
        let contact = new Contact(req.body);
        contact.save()
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json(error))
    })

// export des routes contenues dans le routeur
module.exports = router;