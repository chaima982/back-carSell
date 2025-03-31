const carMod = require('../Model/Car');        //rake7

module.exports={
    createCar:function(req,res){
        const car = new carMod(req.body); 
        car.save(req.body, function(err,item){
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
    getAllCar:function(req,res){ 
        carMod.find({}).populate('expert').populate('annonce').populate('category').exec(function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "list of car",
                    data: item,
                });
            };
        })
    },
    updateCar:function(req,res){
        carMod.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err,item){
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
    deleteCar: function(req,res){
        carMod.findByIdAndDelete(req.params.id, function(err, item){
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
    }
};