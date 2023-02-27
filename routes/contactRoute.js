const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// http://localhost/8099
router.route("/")

    .get((req, res) => {
        // récupère tous les objets
        Contact.find()
            .then((data) => {
                res.render('home', {contact: data});
            })
            .catch((error) => res.status(400).json(error));
    });

// http://localhost:8099
router.route('/contact/new')

    .get((req, res)=> {
        res.render('add-item', { errors : ''});
    })

    .post((req, res) => {
        let errors = "";

        if(req.body.lastName == ""){
            errors += "Le champs nom n'est pas renseigné\n"
        }
        if(req.body.firstName == ""){
            errors += "Le champs prénom n'est pas renseigné\n"
        }
        if(req.body.company == ""){
            errors += "Le champs société n'est pas renseigné\n"
        }
        if(req.body.address == ""){
            errors += "Le champs adresse n'est pas renseigné\n"
        }
        if(req.body.phoneNumber == ""){
            errors += "Le champs tel n'est pas renseigné\n"
        }
        if(req.body.emailAddress == ""){
            errors += "Le champs adresse mail n'est pas renseigné\n"
        }
        if(req.body.fieldOfWork == ""){
            errors += "Le champs secteur n'est pas renseigné\n"
        }
        if(errors != "") {
            res.render('add-item', {
                errors: errors
            })
        }
        else {
            let contact = new Contact(req.body);
            contact.save()
            .then((data) => res.redirect(('/')))
            .catch((error) => res.status(400).json(error));
            
        }
    })

// route : localhost:port/api/
router.route("/contact/delete/:id")

    .get((req,res) => {
        Contact.deleteOne({_id: req.params.id})
            .then((data) => res.redirect(('/')))
            .catch((error) => res.status(400).json(error));
    })

router.route('/contact/edit/:id')

    .get((req, res)=> {
        Contact.findById((req.params.id))
            .then((contact) => {
                res.render('edit-item', { errors : '', contact});
            }).catch((error) => res.status(400).json(error));
    })

    .post((req, res) => {
        let errors = "";
        if(req.body.lastName == ""){
            errors += "Le champs nom n'est pas renseigné\n"
        }
        if(req.body.firstName == ""){
            errors += "Le champs prénom n'est pas renseigné\n"
        }
        if(req.body.company == ""){
            errors += "Le champs société n'est pas renseigné\n"
        }
        if(req.body.address == ""){
            errors += "Le champs adresse n'est pas renseigné\n"
        }
        if(req.body.phoneNumber == ""){
            errors += "Le champs tel n'est pas renseigné\n"
        }
        if(req.body.emailAddress == ""){
            errors += "Le champs email n'est pas renseigné\n"
        }
        if(req.body.fieldOfWork == ""){
            errors += "Le champs secteur n'est pas renseigné\n"
        }
        if(errors != "") {
            Contact.findById((req.params.id))
                .then((contact) => {
                    res.render('edit-item', { errors : errors, contact});    
                })
                .catch((error) => res.status(400).json(error));
        }
        else {
            Contact.updateOne({_id: req.params.id}, req.body)
                .then(() =>  res.redirect(('/')))
                .catch((error) => res.status(400).json(error));
        }
    })

module.exports = router;