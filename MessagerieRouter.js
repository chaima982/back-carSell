const express = require('express');
const chatController = require('../Controller/MessagerieController');
const Message = require('../Model/Messagerie');
const User = require('../Model/userModel');

const router = express.Router();


router.get('/count', chatController.countTotalMessages);

router.get('/:userId/messages', async (req, res) => {
  try {
    const messages = await Message.find({ user: req.params.userId })
      .populate('user', '-password'); // Populer l'utilisateur sans le champ de mot de passe
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Envoyer un message à un utilisateur spécifique
router.post('/:userId/messages', async (req, res) => {
  const { userId } = req.params;
  const { content, timestamp, sentByUser } = req.body;

  if (!content || !timestamp) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Vérifier si l'utilisateur destinataire existe
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const message = new Message({
      user: userId,
      content,
      timestamp,
      sentByUser,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


