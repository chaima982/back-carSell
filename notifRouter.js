// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../Controller/NotifController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware pour vérifier l'authentification

// Route pour obtenir les notifications d'un utilisateur
router.get('/notifications', authMiddleware, notificationController.getNotifications);

// Route pour créer une nouvelle notification
router.post('/notifications', authMiddleware, notificationController.createNotification);

module.exports = router;
