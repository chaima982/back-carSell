const Admodel = require('../Model/Annonce');
const mongoose = require('mongoose');                                             //rake7
module.exports={

    create: function (req, res) {

      //if (req.body["gallery"].length>0) {
            req.body["gallery"] = (req.body["gallery"]).map((file)=> {
                return { name: file };
            });
        //    }
        // else {
        //    req.body["gallery"] = [];
       // }
        console.log(req.body["gallery"])
        const Ad = new Admodel(req.body); 
        Ad.save(req.body, function (err, item) {
          if (err) {
            res.status(404).json({
              status: 404,
              message: "error " + err,
              data: null,
            });
          } else {
            res.status(201).json({
              status: 201,
              message: "success",
              data: item,
            });
          }
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

      getAll: function (req, res) {
        const page = req.query.page || 1; // Corrected the assignment operator to `||`
        const limit = req.query.limit || 6; // Corrected the assignment operator to `||`
      
        Admodel.find({})
        .populate("user")
          .populate("seller")
          .populate("buyer")
          .populate("category")
          .populate("expertise")
          .populate("sponsorship")
       
          
          .exec((err, items) => {
            if (err) {
              res.status(404).json({
                status: 404,
                message: "Error " + err,
                data: null,
              });
            } else {
              res.status(200).json({
                status: 200,
                message: "List of Ads",
                data: items,
              });
            }
          });
      },
   
      update: function(req, res) {
        // Vérifier si des fichiers ont été téléchargés
        if (req.files && req.files.length > 0) {
            // Si oui, traiter les fichiers
            req.body["gallery"] = req.files.map(function(file) {
                return { name: file.filename };
            });
        }
    
        // Mettre à jour les informations de l'annonce
        Admodel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .populate('category')
        .exec(function(err, item) {
          if (err) {
            // En cas d'erreur, renvoyer un message d'erreur
            return res.status(404).json({
              status: 404,
              message: "Error: " + err,
              data: null
            });
          }
          // Si la mise à jour est réussie, renvoyer la nouvelle annonce mise à jour
          res.status(201).json({
            status: 201,
            message: "Annonce mise à jour avec succès",
            data: item
          });
        });
      
    },
 
  

    updateAnnonceSponsor: function(req, res) {
        console.log('sponso***************',req.body);
        Admodel.findByIdAndUpdate(req.params.id,{sponsorship:req.body.sponsorship},{new:true})
        .exec(function(err, item) {
          if (err) {
            return res.status(404).json({
              status: 404,
              message: "Error: " + err,
              data: null
            });
          }res.status(201).json({
            status: 201,
            message: "Annonce mise à jour avec succès",
            data: item
          });
        });
      
    },
    getAnnoncesStats: async function(req, res) {
      try {
          const totalAds = await Admodel.countDocuments();
          const sponsoredAds = await Admodel.countDocuments({ isSponsored: true });
          const nonSponsoredAds = totalAds - sponsoredAds;
          
          

          res.status(200).json({
              totalAds: totalAds,
              sponsoredAds: sponsoredAds,
              nonSponsoredAds: nonSponsoredAds,
              
          });
      } catch (err) {
          console.error(err);
          res.status(500).json({
              status: 500,
              message: "Error: " + err,
              data: null
          });
      }
  },
    updateAnnonceSponsorState: function(req, res) {
        console.log('sponso***************',req.body);
        Admodel.findByIdAndUpdate(req.params.id,{sponsorshipstate:req.body.sponsorshipstate},{new:true})
        .exec(function(err, item) {
          if (err) {
            return res.status(404).json({
              status: 404,
              message: "Error: " + err,
              data: null
            });
          }res.status(201).json({
            status: 201,
            message: "Annonce mise à jour avec succès",
            data: item
          });
        });
      
    },
    updateAnnonceVerifiedState : function(req, res) {
  Admodel.findByIdAndUpdate(req.params.id, { verified: req.body.verified }, { new: true })
    .exec((err, item) => {
      if (err) {
        return res.status(404).json({
          status: 404,
          message: "Error: " + err,
          data: null
        });
      }
      res.status(201).json({
        status: 201,
        message: "Annonce mise à jour avec succès",
        data: item
      });
    });},
   /*  filterByCategory : async (req, res) => {
        const category = req.params.category; // Récupérer la catégorie depuis les paramètres de la requête
    
        try {
            // Requête pour trouver les annonces avec la catégorie spécifiée
            const annonces = await Annonce.find({ category: category });
    
            res.status(200).json(annonces); // Renvoyer les annonces correspondantes
        } catch (error) {
            res.status(500).json({ message: error.message });
        }}, */
    deleteAd: function(req,res){
        Admodel.findByIdAndDelete(req.params.id, function(err, item){
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
        })
    },
    getId : function(req,res){
        console.log(req.params.id)
        Admodel.findById(req.params.id , function(err,item){
            console.log('item',item);
            if(err){
                res.status(404).json({
                    status:404,
                    message : "error" +err,
                    data : null,
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message: "list of Ad",
                    data: item
                })
            }
        })
    },
    // Ajoutez cette méthode à votre contrôleur côté backend

    getAnnoncesByCategory: async function(req, res) {
      try {
        const categories = await Admodel.aggregate([
          { $group: { _id: "$category", count: { $sum: 1 } } },
          { $project: { _id: 0, name: "$_id", count: 1 } } // Projeter le champ 'category' comme 'name'
        ]);
        res.status(200).json(categories);
      } catch (err) {
        console.error(err);
        res.status(500).json({
          status: 500,
          message: "Error: " + err,
          count: null
        });
      }
    },
    

    getAnnonceByCats :function(req,res){
        console.log(req.params.id)
        Admodel.find({category:req.params.id} , function(err,item){
            
            if(err){
                res.status(404).json({
                    status:404,
                    message : "error" +err,
                    data : null,
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message: "list of Ad",
                    data: item
                })
            }
        })
    },
    countAnnonces :async function(req,res){
       // const count = await  Admodel.countDocuments();
       try {
        // Get the user ID from the request parameters
        const userId = req.params.id;

        // Execute both the find and countDocuments operations in parallel
        const [documents, count] = await Promise.all([
            Admodel.find({ user: userId }).exec(),       // Find documents
            Admodel.countDocuments({ user: userId }).exec() // Count documents
        ]);

        // Send the combined response
        res.status(200).json({
            status: 200,
            message: "Number of annonces and their details",
            data: {
                count: count,
                documents: documents
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 500,
            message: "Error: " + err,
            data: null
        });
    }},
   
       
    countAllAnnonces: async function(req, res) {
        try {
          const count = await Admodel.countDocuments().exec();
          res.status(200).json({
            status: 200,
            message: "Total number of annonces",
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
      },
    
         
    filterAnnonces: async function(filters) {
        try {
            let query = Admodel.find();

            // Appliquer les filtres
            if (filters.titre) {
                query = query.where('titre').regex(new RegExp(filters.titre, 'i'));
            }
            if (filters.price) {
                query = query.where('price').regex(new RegExp(filters.price, 'i'));
            }
            if (filters.gouvernerat) {
                query = query.where('gouvernerat').regex(new RegExp(filters.gouvernerat, 'i'));
            }
            if (filters.carburant) {
                query = query.where('carburant').regex(new RegExp(filters.carburant, 'i'));
            }
            if (filters. carrosserie) {
                query = query.where(' carrosserie').regex(new RegExp(filters. carrosserie, 'i'));
            }
            if (filters. category) {
                console.log("filters. category",filters);
                
                query = query.where('category').equals(mongoose.Types.ObjectId(filters.category));
                console.log("query",query);
            }
            if (filters.modele) {
                query = query.where('modele').regex(new RegExp(filters.modele, 'i'));
            }
            if (filters.marque) {
                query = query.where('marque').regex(new RegExp(filters.marque, 'i'));
            }
            if (filters.annee) {
                let annee = filters.annee;
                // Si filters.annee est un nombre, convertissez-le en chaîne de caractères
                if (typeof filters.annee === 'number') {
                    annee = filters.annee.toString();
                }
                query = query.where('annee').regex(new RegExp(annee, 'i'));
            }
             if (filters.kilometrage) {
                query = query.where('kilometrage').regex(new RegExp(filters.kilometrage, 'i'));
            }
            if (filters.boite) {
                query = query.where('boite').regex(new RegExp(filters.boite, 'i'));
            }
                
            const annonces = await query.exec();
            return annonces;
        } catch (error) {
            throw error;
        }
    },
    getSponsoredAds: function(req, res) {
      Admodel.find({ sponsorshipstate: true })
          .populate("user")
          .populate("seller")
          .populate("buyer")
          .populate("category")
          .populate("expertise")
          .populate("sponsorship")
          .exec((err, items) => {
              if (err) {
                  res.status(404).json({
                      status: 404,
                      message: "Error " + err,
                      data: null,
                  });
              } else {
                  res.status(200).json({
                      status: 200,
                      message: "List of Sponsored Ads",
                      data: items,
                  });
              }
          });
  },

  getNonSponsoredAds: function(req, res) {
      Admodel.find({ sponsorshipstate: false })
          .populate("user")
          .populate("seller")
          .populate("buyer")
          .populate("category")
          .populate("expertise")
          .populate("sponsorship")
          .exec((err, items) => {
              if (err) {
                  res.status(404).json({
                      status: 404,
                      message: "Error " + err,
                      data: null,
                  });
              } else {
                  res.status(200).json({
                      status: 200,
                      message: "List of Non-Sponsored Ads",
                      data: items,
                  });
              }
          });
  }
};