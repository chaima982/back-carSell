const buyerMod = require('../Model/Buyer')          //rake7
const nodemailer = require("nodemailer")


var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5c6556bba0d718",
      pass: "a6aa060270c96d"
    }
  });
  
const { randomBytes } = require("crypto");

const bcrypt = require('bcrypt')

module.exports = {
    create: async(req, res) => {

        const salt = bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hashSync(req.body.password, parseInt(salt))

        const buyer = new buyerMod({
            ...req.body,
            password: hashPassword,
            codeVerification: randomBytes(6).toString("hex"),
        });
        await buyer.save(req.body, function(err, item) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: err,
                    data: null
                })
            } else {
                transport.sendMail({
                        from: '"Test Server" <test@example.com>',
                        to: req.body.email,
                        subject: "Email Test",
                        text: "welcome " + req.body.username + "to website",
                        html: `click here to <a href="http://localhost:8080/users/verify/${item.codeVerification}">verify</a> to confirm`,
                    },
                    (err, info) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        console.log("Info: ", info);
                        res.json({
                            message: "Email successfully sent.",
                        });
                    }
                );


                res.status(201).json({
                    status: 201,
                    massage: "created successfully",
                    data: item
                })
            }
        })
    },
    gatAll: function(req, res) {
        buyerMod.find({},'-password').populate('paiement').populate('messagerie').populate('annonce').populate('contrat').exec(function(err, item) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: "error" + err,
                    data: null
                })
            } else {
                res.status(201).json({
                    status: 201,
                    massage: "buyer created successfully",
                    data: item
                })
            }
        })
    },
    update: function(req, res) {
        buyerMod.findByIdAndUpdate(req.params.id, req.id, { new: true }, function(err, item) {

            if (err) {
                res.status(404).json({
                    status: 404,
                    message: "error" + err,
                    data: null
                })
            } else {
                res.status(201).json({
                    status: 201,
                    massage: "buyer created successfully",
                    data: item
                })
            }
        })
    },
    delete: function(req, res) {
        buyerMod.findByIdAndDelete(req.params.id, function(err, item) {
            if (err) {
                res.status(404).json({
                    statut: 404,
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
        buyerMod.findById(req.params.id, function(err, item) {
            if (err) {
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message: "successfully",
                    data: item,
                });
            };
        })
    }
}