const express = require ('express');
const route = express.Router();
const Annonce=require('../Model/Annonce');
const annonceController = require('../Controller/AnnonceController');
const upload = require('../middlewares/uploadFile');
route.put('/updateAnnonceVerifiedState/:id', annonceController.updateAnnonceVerifiedState);
route.post("/add",annonceController.create)
route.get("/", annonceController.getAll)
route.put('/:id',upload.array('gallery'),annonceController.update)
route.put('/updateAnnonceSponso/:id',annonceController.updateAnnonceSponsor)
route.delete('/delete/:id',annonceController.deleteAd)
route.get('/get/:id', annonceController.getId)
route.get('/getAnnonce/:id', annonceController.getAnnonceByCats)
route.get('/countAnnonces/:id',annonceController.countAnnonces)
route.get('/stats',annonceController.getAnnoncesStats)
route.get('/byCategory',annonceController.getAnnoncesByCategory)
route.get('/countAll', annonceController.countAllAnnonces)
route.put('/updateAnnonce/:id',annonceController.update)
route.put('/updateAnnonceSponsorState/:id',annonceController.updateAnnonceSponsorState)
route.post('/paiement/add', annonceController.processPayment);
route.get('/ads/sponsored', annonceController.getSponsoredAds);
route.get('/verified', (req, res) => {
  Annonce.find({ verified: true })
    .exec((err, items) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: "Error: " + err,
          data: null
        });
      }
      res.status(200).json({
        status: 200,
        message: "Annonces vérifiées récupérées avec succès",
        data: items
      });
    });
});
route.get('/sponsorisees', async (req, res) => {
    try {
        const annonces = await Annonce.find({
            $and: [
              { sponsorshipstate: true },
              { sponsorship: { $ne: null } } // $ne signifie "not equal" (différent de)
            ]
          });
      res.json(annonces);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des annonces sponsorisées." });
    }
})
route.get('/ads/nonsponsored', annonceController.getNonSponsoredAds);
route.post('/annonces', async (req, res) => {
    const filters = req.body; 

    try {
        const annonces = await annonceController.filterAnnonces(filters); // Utilisez annonceController pour accéder à la méthode de filtrage
        res.json(annonces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors du filtrage des annonces.' });
    }
});
module.exports = route