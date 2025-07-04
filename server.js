const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');

dotenv.config();

console.log('Starting server...');
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

process.on('unhandledRejection', err => {
  console.error('🔥 Unhandled rejection:', err);
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
})();
