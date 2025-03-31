const sponsorMod = require('../Model/sponsorship');    //rake7

module.exports={
    createSponsor:function(req,res){
        const sponsor = new sponsorMod(req.body); 
        sponsor.save(req.body, function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                console.log('item',item);
                res.status(201).json({
                    status:201,
                    message: "success",
                    data: item,
                });
            };
        });
    },
    processPayment: async function(req, res) {
        const { cardNumber, expire, name, cvc, cardType } = req.body;
    
        // Process payment logic here...
    
        if (paymentSuccessful) { // Replace with actual payment success condition
            const annonceId = req.body.annonceId;
            const montantPaye = req.body.montantPaye;
    
            // Save sponsorship data
            const sponsorship = new Sponsorship({ montantPaye, annonce: annonceId });
            await sponsorship.save();
    
            // Update the annonce to set sponsorship state to true and link sponsorship
            await Admodel.findByIdAndUpdate(annonceId, { sponsorshipstate: true, sponsorship: sponsorship._id });
    
            res.status(201).json({
                status: 201,
                message: "Payment successful and sponsorship updated",
                data: sponsorship
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "Payment failed",
                data: null
            });
        }
    },
    
    getAllSponsor:function(req,res){ 
        sponsorMod.find({}).populate('annonce').populate('admin').exec(function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "list of sponsor",
                    data: item,
                });
            };
        })
    },
    updateSponsor:function(req,res){
        sponsorMod.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err,item){
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
    deleteSponsor: function(req,res){
        sponsorMod.findByIdAndDelete(req.params.id, function(err, item){
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
    getIdSponsor : function(req, res){
        sponsorMod.findById(req.params.id, function(err,item){
            if(err){
                res.status(404).json({
                    status:404,
                    message : "error" + err,
                    data: null
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message : "list of sponsor",
                    data: item
                })
            }
        })
    }
};