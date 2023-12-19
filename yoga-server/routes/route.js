const express = require('express');
const router = express.Router();
const User = require('../models/users.js');



router.post('/register', async (req, res) => {
    const { name, age, phone, timeSlot } = req.body;
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-11
    const currentYear = new Date().getFullYear();
  
    try {
      let user = await User.findOne({ phone: phone });
      if (!user) {
        // New user registration
        user = new User({
          name,
          age,
          phone,
          registrations: [{ month: currentMonth, year: currentYear, timeSlot, batchChanged: false }]
        });
      } else {
        // Existing user
        const latestRegistration = user.registrations.slice(-1)[0];
        const firstRegistration=user.registrations[0];
        if (latestRegistration.month === currentMonth && latestRegistration.year === currentYear) {
          if (latestRegistration.timeSlot === timeSlot) {
            return res.status(400).json({ message: 'Already registered for this batch this month.' });
        }
        if(firstRegistration.month === currentMonth && firstRegistration.year===currentYear)
        return res.status(400).json({ message: 'Batch Change not allowed for first month.' });
          if (latestRegistration.batchChanged) {
            return res.status(400).json({ message: 'Batch change already done for this month.' });
          }
          
          latestRegistration.timeSlot = timeSlot;
          latestRegistration.batchChanged = true;
        } else {
          
          user.registrations.push({ month: currentMonth, year: currentYear, timeSlot, batchChanged: false });
        }
      }
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  module.exports = router;