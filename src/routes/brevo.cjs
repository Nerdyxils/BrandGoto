// const express = require('express');
// const router = express.Router();
// const fetch = require('node-fetch');

// router.post('/contact', async (req, res) => {
//   const { email, attributes, listIds, updateEnabled } = req.body;

//   if (!email || !attributes || !attributes.FIRSTNAME || !attributes.SMS || !attributes.SERVICES || !Array.isArray(listIds)) {
//     console.warn('⚠️ Missing fields:', req.body);
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   const payload = {
//     email,
//     attributes,
//     listIds,
//     updateEnabled
//   };

//   try {
//     const response = await fetch('https://api.brevo.com/v3/contacts', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'api-key': process.env.BREVO_API_KEY
//       },
//       body: JSON.stringify(payload)
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       console.error('❌ Brevo API error:', result);
//       return res.status(500).json({ error: 'Failed to add contact' });
//     }

//     res.status(200).json({ message: 'Contact added successfully', data: result });
//   } catch (err) {
//     console.error('❌ Request failed:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;
