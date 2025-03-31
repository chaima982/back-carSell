const userModel = require("../Model/userModel")
const bcrypt = require("bcrypt");
const { log } = require("console");

const jwt = require("jsonwebtoken")
const TOKEN_SECRET = "car";
const R_TOKEN_SECRET = "car";

const {join} = require('path') 

let refreshTokens = [];

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id }, R_TOKEN_SECRET, { expiresIn: "15m" });
};

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id }, TOKEN_SECRET, { expiresIn: "15m" });
};
const authUser = (req, res, next) => {
    const userType = req.user.type;

    if (userType === "admin") {
        res.redirect("/dashboard");
    } else {
        res.redirect("/homepage");
    }
};

module.exports = {
    create: async (req, res) => {
        if (req.files && req.files.length > 0) {
            req.body["gallery"] = req.files.map(function(file) {
                return { name: file.filename };
            });
        } else {
            req.body["gallery"] = [];
        }
    
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
    
            const codeVerification = randomBytes(6).toString("hex");
    
            const user = new userModel({
                ...req.body,
                password: hashPassword,
                codeVerification: codeVerification,
            });
    
            const savedUser = await user.save();
    
            // Vérifier que req.body.username et req.body.email sont définis avant de les utiliser
            if (req.body.username && req.body.email) {
                transport.sendMail({
                    from: '"Test Server" <test@example.com>',
                    to: req.body.email,
                    subject: "Email Test",
                    text: `Welcome ${req.body.username} to the website.`,
                    html: `Click here to <a href="http://localhost:8080/users/verify/${codeVerification}">verify</a> your account.`,
                }, (err, info) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            message: "Failed to send email.",
                            error: err.message // Utilisation de err.message pour obtenir un message d'erreur plus descriptif
                        });
                    } else {
                        console.log("Info: ", info);
                        res.status(201).json({
                            message: "Admin created successfully and email sent.",
                            data: savedUser
                        });
                    }
                });
            } else {
                res.status(400).json({
                    message: "Username or email is missing."
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error.",
                error: error.message // Utilisation de error.message pour obtenir un message d'erreur plus descriptif
            });
        }
    },

    logout: (req, res) => {
        console.log("refreshTokens", refreshTokens)
        refreshTokens = refreshTokens.filter((c) => c != req.body.token);
        console.log("filterfilter", refreshTokens)


        res.status(200).json({
            status: 200,
            message: "Logged out!"
        });
    },
 
    refresh: (req, res) => {
        const RefreshToken = req.body.token;
        if (!refreshTokens.includes(RefreshToken)) res.status(400).send("Refresh Token Invalid");
        jwt.verify(R_TOKEN_SECRET, TOKEN_SECRET, (err, user) => {
            refreshTokens = refreshTokens.filter((c) => c != RefreshToken);
            const accessToken = generateAccessToken(RefreshToken)
            const refreshToken = generateRefreshToken(RefreshToken)
            refreshTokens.push(refreshToken);
            res.json({ accessToken: accessToken, refreshToken: refreshToken })
        });
    },

    login: async(req, res) => {
        const user = await userModel.findOne({ email: req.body.email })
       
        if (!user) {
            res.status(404).json({
                status: 404,
                message: "email  not found",
                data: null,
            });
        } else {
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) {
                res.status(401).json({
                    status: 401,
                    message: " password not found",
                    data: null,
                });
            } else {
                const accessToken = generateAccessToken({ user: req.body.name })
                const refreshToken = generateRefreshToken({ user: req.body.name })

                refreshTokens.push(refreshToken)
                res.status(201).json({
                    status: 201,
                    massage: "success",
                    userId: user._id, 
                    data: user,
                    accessToken: accessToken, 
                    refreshToken: refreshToken 
                });
                

               
            }
        }
         
    },
    
 
    register: async (req, res) => {
        const { name,lastname, CIN, phone, email, password } = req.body;

        try {
            // Check if the email already exists in the database
            const existingUser = await userModel.findOne({ email: email });

            if (existingUser) {
                return res.status(409).json({ message: 'Email already in use' });
            }

            // Hash the password
            const hashPass = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = new userModel({
                lastname: lastname,
                name: name,
                CIN: CIN,
                phone: phone,
                email: email,
                password: hashPass
            });

            // Save the user
            await newUser.save();

            // Respond with success message
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

    verifyMail: async(req,res) => {
        try {
            const { codeVerification } = req.params;
            const user = await userModel.findOne({codeVerification});
            user.codeVerification = undefined,
            user.verified = true,
            user.save()
            return res.sendFile(join (__dirname , "../template/success.html"))
        } catch (error) {
            return res.sendFile(join (__dirname , "../template/error.html"))
        }
    },
    updateUser: async (req, res) => {
        const userId = req.params.id;
        const updatedUserData = req.body;
        if (req.files && req.files.length > 0) {
            // Si oui, traiter les fichiers
            updatedUserData["gallery"] = req.files.map(function(file) {
                return { name: file.filename };
            });
        }
    
        try {
            const updatedUser = await userModel.findByIdAndUpdate(userId, updatedUserData, { new: true });
            console.log('updateUser',updatedUser)
            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    },
    
    deleteUser: async (req, res) => {
        const userId = req.params.userId;
    
        try {
            await userModel.findByIdAndDelete(userId);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    },
 
    getAllUsers: async (req, res) => {
        try {
            const users = await userModel.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error getting users', error: error.message });
        }
    },
    getIdCar : function(req, res){
        carMod.findById(req.params.id, function(err,item){
            if(err){
                res.status(404).json({
                    status:404,
                    message : "error" + err,
                    data: null
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message : "list of car",
                    data: item
                })
            }
        })
    },
    getProfil: async (req, res) => {
        try {
            const profil = await userModel.findById(JSON.parse(req.params.id)); 
console.log("profil",profil);
            if (!profil) { 
                return res.status(404).json({
                    status: 404,
                    message: "Profil not found",
                    data: null
                });
            }

           
            res.status(200).json({
                status: 200,
                message: "Profil found",
                data: admin
            });
        } catch (err) {
            
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                error: err.message
            });
        }
    },
    
    getAcheteur : async (req, res) => {
        try {
            const acheteurs = await userModel.find({ itemtype:'acheteur' });
            res.status(200).json(acheteurs);
        } catch (error) {
            res.status(500).json({ message: 'Error getting acheteurs', error: error.message });
        }
    },
    
    getVendeur: async (req, res) => {
        try {
            const vendeurs = await userModel.find({itemtype:'vendeur' });
            res.status(200).json(vendeurs);
        } catch (error) {
            res.status(500).json({ message: 'Error getting vendeurs', error: error.message });
        }
    },
    
    getAdmin: async (req, res) => {
        try {
            const admins = await userModel.find({ itemtype:'admin' });
            res.status(200).json(admins);
        } catch (error) {
            res.status(500).json({ message: 'Error getting admins', error: error.message });
        }
    },
    getById: async (req, res) => {
        try {
            const admin = await userModel.findById({ _id: req.params.id}); // Utilisez directement la méthode findById de Mongoose

            if (!admin) { // Vérifiez si aucun admin n'est trouvé pour l'ID donné
                return res.status(404).json({
                    status: 404,
                    message: "Admin not found",
                    data: null
                });
            }

            // Si un admin est trouvé, renvoyez-le dans la réponse
            res.status(200).json({
                status: 200,
                message: "Admin found",
                data: admin
            });
        } catch (err) {
            // Gestion des erreurs en cas d'échec de la recherche
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
                error: err.message
            });
        }
    },
    getExpert: async (req, res) => {
        try {
            const experts = await userModel.find({ itemtype: 'expert' });
            res.status(200).json(experts);
        } catch (error) {
            res.status(500).json({ message: 'Error getting experts', error: error.message });
        }
    },
    countAllUsers: async function(req, res) {
        try {
          const count = await userModel.countDocuments();
          res.status(200).json({
            status: 200,
            message: "Total number of users",
            count: count  // Ajouter la propriété count dans la réponse JSON
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({
            status: 500,
            message: "Error: " + err,
            count: null  // Ajouter la propriété count dans la réponse JSON
          });
        }
      }
}

