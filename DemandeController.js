const modeldemande = require('../Model/Demande'); //rake7

module.exports={
    createDem: function(req, res) {
        console.log("req.body[",req.body["gallery"]);
        if (req.files && req.files.length > 0) {
            req.body["gallery"] = req.files.map(function(file) {
                return { name: file.filename };
            });
            req.body["previewImage"] = req.files.map(function(file) {
                return { name: file.filename };
            });
        } else {
            req.body["gallery"] = [];
            req.body["previewImage"] = [];
        }
    console.log("req.body",req.body);
        const demande = new modeldemande(req.body);
        
        demande.save(function(err, item) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: "Error: " + err,
                    data: null
                });
            } else {
                res.status(201).json({
                    status: 201,
                    message: "Success",
                    data: item
                });
            }
        });
    },
    getAllDem:function(req,res){ 
        const page = req.query.page || 1; // Corrected the assignment operator to `||`
        const limit = req.query.limit || 8; // Corrected the assignment operator to `||`
      
        modeldemande.find({}).populate('expert').populate('admin').exec(function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "list of demande",
                    data: item,
                });
            };
        })
    },
    updateDem:function(req,res){
        if (req.files && req.files.length > 0) {
            // Si oui, traiter les fichiers
            req.body["gallery"] = req.files.map(function(file) {
                return { name: file.filename };
            });
        }
    
        modeldemande.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "success",
                    data: item,
                });
            };
        })
    },
    delete: function(req,res){
        modeldemande.findByIdAndDelete(req.params.id, function(err, item){
            if(err){
                res.status(404).json({
                    status: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "Deleted successfully",
                });
            };
        } )
    },
    getIdDem : function(req, res){
        modeldemande.findById(req.params.id, function(err,item){
            if(err){
                res.status(404).json({
                    status:404,
                    message : "error" + err,
                    data: null
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message : "list of demande",
                    data: item
                })
            }
        })
    },


};