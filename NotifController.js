// controllers/notificationController.js
const Notification = require('../Model/Notification');
const User = require('../Model/userModel');

// Obtenir les notifications d'un utilisateur
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .populate('sender', 'name lastname');
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer une nouvelle notification
exports.createNotification = async (req, res) => {
  const { content, recipientId } = req.body;
  const senderId = req.user.id;

  const notification = new Notification({
    sender: senderId,
    recipient: recipientId,
    content,
    timestamp: new Date()
  });

  try {
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
