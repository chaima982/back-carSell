const expertiseMod = require('../Model/expertise');       

module.exports={
    create:function(req,res){
        console.log("aaaaaa",req.body);
        const expertise = new  expertiseMod(req.body); 
        expertise.save(req.body, function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "success ",
                    data: item,
                });
            };
        });
    },
    getAll:function(req,res){ 
        expertiseMod.find({}).populate('expert').populate('annonce').populate('seller').populate('user').exec(function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "list of rapport",
                    data: item,
                });
            };
        })
    },
    update:function(req,res){
        expertiseMod.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err,item){
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
        expertiseMod.findByIdAndDelete(req.params.id, function(err, item){
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
    getIdrapport: function(req, res){
        expertiseMod.findById(req.params.id, function(err,item){
            if(err){
                res.status(404).json({
                    status:404,
                    message : "error" + err,
                    data: null
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message : "list of rapport",
                    data: item
                })
            }
        })
    }
};