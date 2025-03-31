const bcrypt = require('bcrypt');
const adminModel = require('../Model/Admin');
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { join } = require('path');

const TOKEN_SECRET = "car";
const R_TOKEN_SECRET = "car";
let refreshTokens = [];

const generateRefreshToken = (admin) => {
    return jwt.sign({ id: admin.id }, R_TOKEN_SECRET, { expiresIn: "15m" });
};

const generateAccessToken = (admin) => {
    return jwt.sign({ id: admin.id }, TOKEN_SECRET, { expiresIn: "15m" });
};

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "8b6c215cd0cee9",
        pass: "9d402087e42983"
    }
});

module.exports = {
    create: async (req, res) => {
        if (req.files && req.files.length > 0) {
            req.body["gallery"] = req.files.map(function (file) {
                return { name: file.filename };
            });
        } else {
            req.body["gallery"] = [];
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            const admin = new adminModel({
                ...req.body,
                password: hashPassword,
                codeVerification: randomBytes(6).toString("hex"),
            });

            const savedAdmin = await admin.save();

            transport.sendMail({
                from: '"Test Server" <test@example.com>',
                to: req.body.email,
                subject: "Email Test",
                text: "welcome " + req.body.username + " to website",
                html: `click here to <a href="http://localhost:8080/users/verify/${admin.codeVerification}">verify</a> to confirm`,
            }, (err, info) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: "Failed to send email.",
                        error: err
                    });
                } else {
                    console.log("Info: ", info);
                    res.status(201).json({
                        message: "Admin created successfully and email sent.",
                        data: savedAdmin
                    });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error.",
                error: error
            });
        }
    },

    logout: (req, res) => {
        refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
        res.status(200).json({
            status: 200,
            message: "Logged out!"
        });
    },

    refresh: (req, res) => {
        const refreshToken = req.body.token;
        if (!refreshToken || !refreshTokens.includes(refreshToken)) {
            return res.status(400).json({ message: "Refresh Token Invalid" });
        }
        jwt.verify(refreshToken, R_TOKEN_SECRET, (err, admin) => {
            if (err) return res.status(403).json({ message: "Token verification failed" });

            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            const newAccessToken = generateAccessToken(admin);
            const newRefreshToken = generateRefreshToken(admin);
            refreshTokens.push(newRefreshToken);
            res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        });
    },

   

    register: async (req, res) => {
        const { name, lastname, CIN, phone, email, password } = req.body;

        try {
            const existingAdmin = await adminModel.findOne({ email: email });

            if (existingAdmin) {
                return res.status(409).json({ message: 'Email already in use' });
            }

            const hashPass = await bcrypt.hash(password, 10);

            const newUser = new adminModel({
                lastname: lastname,
                name: name,
                CIN: CIN,
                phone: phone,
                email: email,
                password: hashPass
            });

            await newUser.save();

            res.status(201).json({
                message: 'User registered successfully!',
                user: newUser
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error registering user',
                error: error.message,
            });
        }
    },

    getAll: function (req, res) {
        adminModel.find({}, '-password').populate('demande').populate('sponsorship').exec(function (err, items) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: "Error: " + err,
                    data: null
                });
            } else {
                res.status(200).json({
                    status: 200,
                    message: "Admins retrieved successfully",
                    data: items
                });
            }
        });
    },

    update: function (req, res) {
        if (req.files && req.files.length > 0) {
            req.body["gallery"] = req.files.map(function (file) {
                return { name: file.filename };
            });
        }

        adminModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, item) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: "Error: " + err,
                    data: null
                });
            } else {
                res.status(200).json({
                    status: 200,
                    message: "Admin updated successfully",
                    data: item
                });
            }
        });
    },

    delete: function (req, res) {
        adminModel.findByIdAndDelete(req.params.id, function (err, item) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: "Error: " + err,
                    data: null
                });
            } else {
                res.status(200).json({
                    status: 200,
                    message: "Deleted successfully",
                });
            }
        });
    },

    getById: function (req, res) {
        adminModel.findById(req.params.id, function (err, item) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: "Error: " + err,
                    data: null
                });
            } else {
                res.status(200).json({
                    status: 200,
                    message: "Admin retrieved successfully",
                    data: item
                });
            };
        })
    },
    login: async(req, res) => {
        const admin = await adminModel.findOne({ email: req.body.email })
       console.log("admin",admin);
        if (!admin) {
            res.status(404).json({
                status: 404,
                message: "email  not found",
                data: null,
            });
        } else {
            const validPass = await bcrypt.compare(req.body.password, admin.password);
            if (!validPass) {
                res.status(401).json({
                    status: 401,
                    message: " password not found",
                    data: null,
                });
            } else {
                const accessToken = generateAccessToken({ admin: req.body.name })
                const refreshToken = generateRefreshToken({ admin: req.body.name })

                refreshTokens.push(refreshToken)
                res.status(201).json({
                    status: 201,
                    massage: "success",
                    adminId: admin._id, 
                    data: admin,
                    accessToken: accessToken, 
                    refreshToken: refreshToken 
                });
                

               
            }
        }
         
    },
}





