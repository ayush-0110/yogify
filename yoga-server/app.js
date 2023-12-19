const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const User = require('./models/User');
const userRoutes = require('./routes/route.js');
require('dotenv').config();

const app = express();
app.use(cors({
    origin:'*'
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use('/api/users', userRoutes);

//   app.post('/register', async (req, res) => {
//     const { name, age, phone, timeSlot } = req.body;
//   const currentMonth = new Date().getMonth() + 1;
//   const currentYear = new Date().getFullYear();

//   try {
//     let user = await User.findOne({ name:name, phone: phone });
//     if (!user) {
//       // New user registration
//       user = new User({
//         name,
//         age,
//         phone,
//         registrations: [{ month: currentMonth, year: currentYear, timeSlot, batchChanged: false }]
//       });
//     } else {
//       // Existing user
//       const latestRegistration = user.registrations.slice(-1)[0];
//       if (latestRegistration.month === currentMonth && latestRegistration.year === currentYear) {
//         if (latestRegistration.timeSlot === timeSlot) {
//           return res.status(400).json({ message: 'Already registered for this batch this month.' });
//         }
//         if (latestRegistration.batchChanged) {
//           return res.status(400).json({ message: 'Batch change already done for this month.' });
//         }
//         // Batch change allowed for the month
//         latestRegistration.timeSlot = timeSlot;
//         latestRegistration.batchChanged = true;
//       } else {
//         // New month registration
//         user.registrations.push({ month: currentMonth, year: currentYear, timeSlot, batchChanged: false });
//       }
//     }
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
//   });
  
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  


const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });