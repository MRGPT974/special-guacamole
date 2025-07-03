require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sequelize = require('./models').sequelize;

const authRoutes = require('./routes/authRoutes');
const proRoutes = require('./routes/proRoutes');
const requestRoutes = require('./routes/requestRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pros', proRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base :', err);
  });
