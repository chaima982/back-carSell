const Message = require('../Model/Messagerie');
const User = require('../Model/userModel');


module.exports = {
 
    countTotalMessages: async function(req, res) {
        try {
          const count = await Message.countDocuments();
          res.status(200).json({
            status: 200,
            message: "Total number of messages",
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
};

exports.getMessages = async (req, res) => {
  try {
    // Récupérer tous les messages pour l'utilisateur spécifié
    const messages = await Message.find({ user: req.params.userId })
      .populate('user', '-password') // Populer l'utilisateur sans le champ de mot de passe
      .exec(); // Exécuter la requête
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.sendMessage = async (req, res) => {
  const { userId, content, timestamp, sentByUser } = req.body;

  if (!userId || !content || !timestamp) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Vérifier si l'utilisateur existe
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
  }}