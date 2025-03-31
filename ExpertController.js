const expertMod = require('../Model/Expert')      //rake7
const nodemailer = require("nodemailer")
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "8b6c215cd0cee9",
        pass: "9d402087e42983"
    }
});
const bcrypt = require('bcrypt')

module.exports = {
    create: async (req, res) => {
        try {
            // Générer le sel
            const salt = await bcrypt.genSalt(10);

            // Hasher le mot de passe avec le sel
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            // Créer un nouvel expert avec le mot de passe hashé
            const expert = new expertMod({
                ...req.body,
                password: hashPassword
            });

            // Sauvegarder l'expert dans la base de données
            await expert.save((err, item) => {
                if (err) {
                    return res.status(404).json({
                        status: 404,
                        message: "Error: " + err,
                        data: null,
                    });
                } else {
                    // Envoyer un email de bienvenue
                    transport.sendMail({
                        from: '"Test Server" <test@example.com>',
                        to: req.body.email,
                        subject: "Email Test",
                        text: "Welcome " + req.body.username + " to the website",
                    }, (mailErr, info) => {
                        if (mailErr) {
                            console.log(mailErr);
                            return res.status(500).json({
                                status: 500,
                                message: "Failed to send email.",
                                data: null,
                            });
                        } else {
                            console.log("Info: ", info);
                            return res.status(201).json({
                                status: 201,
                                message: "Success",
                                data: item,
                            });
                        }
                    });
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: 500,
                message: "Internal server error.",
                error: error,
            });
        }
    },
    
    getAll: function(req, res) {
        expertMod.find({},'-password').populate('demande').populate('messagerie').populate('contrat').populate('car').populate('user').exec(function(err, item) {
            if (err) {
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message: "list of experts",
                    data: item,
                });
            };
        })
    },
    update: function(req, res) {
        expertMod.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, item) {
            if (err) {
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message: "success ",
                    data: item,
                });
            };
        })
    },
    delete: function(req, res) {
        expertMod.findByIdAndDelete(req.params.id, function(err, item) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message: "Deleted successfully",
                });
            };
        })
    },
    getId: function(req, res) {
        expertMod.findById(req.params.id, function(err, item) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: "error" + err,
                    data: null
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message: "list of experts",
                    data: item
                })
            }
        })
    }
};