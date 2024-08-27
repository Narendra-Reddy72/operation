const express  = require('express');
const cors = require('cors');

const authController = require('./routes/authRoutes');
const userController = require('./routes/userRoutes');
const productController = require('./routes/productRoutes');
const suppController = require('./routes/suppRoutes');
const orderController = require('./routes/orderRoutes')
const app = express();

app.use(express.json())

app.use(cors())

app.use('/api/auth',authController);
app.use('/api/users',userController);
app.use('/api/prod',productController);
app.use('/api/supp',suppController);
app.use('/api/ord',orderController);

module.exports = app