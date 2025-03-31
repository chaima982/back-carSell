const modelComments = require("../Model/comments")     //rake7



module.exports={
    create:function(req,res){
        const comments = new modelComments(req.body); 
        comments.save(req.body, function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "success create comments",
                    data: item,
                });
            };
        });
    },
    getAll:function(req,res){ 
        modelComments.find({annonce:req.params.id}).populate('user').exec(function(err,item){ 
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "list of comments",
                    data: item,
                });
            };
        })
    },
    update:function(req,res){
        modelComments.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "success updated",
                    data: item,
                });
            };
        })
    },
    delete: function(req,res){
        modelComments.findByIdAndDelete(req.params.id, function(err, item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "Deleted successfully",
                    data: item,
                });
            };
        } )
    },
    getbyId: function(req,res){
        modelComments.findById(req.params.id,function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "list of comments",
                    data: item,
                });
            };
        }) 
    }
};