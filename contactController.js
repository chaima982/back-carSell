const contactMod = require('../Model/contact'); //rake7  

module.exports={
    create:function(req,res){
        const contact = new contactMod(req.body); 
        contact.save(req.body, function(err,item){
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
        });
    },
    getAll:function(req,res){ 
        contactMod.find({}).populate('user').populate('admin').populate('expert').exec(function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "list of contact",
                    data: item,
                });
            };
        })
    },
    update:function(req,res){
        contactMod.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err,item){
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
        contactMod.findByIdAndDelete(req.params.id, function(err, item){
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
    getId: function(req, res){
        contactMod.findById(req.params.id, function(err,item){
            if(err){
                res.status(404).json({
                    status:404,
                    message : "error" + err,
                    data: null
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message : "list of contact",
                    data: item
                })
            }
        })
    }
};