const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/contact', async (req, res) => {
  const { name, email, phone, services } = req.body;

  const payload = {
    email,
    attributes: {
      FIRSTNAME: name,
      SMS: phone,
      SERVICES: services.join(', '),
    },
    listIds: [2], 
    updateEnabled: true,
  };

  try {
    const response = await axios.post('https://api.brevo.com/v3/contacts', payload, {
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json({ message: 'Contact added!', data: response.data });
  } catch (error) {
    console.error('❌ Brevo API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to add contact' });
  }
});

module.exports = router;
