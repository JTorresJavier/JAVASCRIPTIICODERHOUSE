const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const { PORT, MONGO_URL } = require('./config/env');
const initializePassport = require('./config/passport.config');

// DAO
const UsersDAO = require('./dao/users.dao');
const ProductsDAO = require('./dao/products.dao');
const CartsDAO = require('./dao/carts.dao');
const TicketsDAO = require('./dao/tickets.dao');

// Repos
const UsersRepository = require('./repositories/users.repository');
const ProductsRepository = require('./repositories/products.repository');
const CartsRepository = require('./repositories/carts.repository');
const TicketsRepository = require('./repositories/tickets.repository');

// Services
const AuthService = require('./services/auth.service');
const ProductsService = require('./services/products.service');
const CartsService = require('./services/carts.service');
const PurchaseService = require('./services/purchase.service');

// Controllers
const SessionsController = require('./controllers/sessions.controller');
const ProductsController = require('./controllers/products.controller');
const CartsController = require('./controllers/carts.controller');

// Routes builders
const buildSessionsRouter = require('./routes/sessions.router');
const buildProductsRouter = require('./routes/products.router');
const buildCartsRouter = require('./routes/carts.router');

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mongo connect
mongoose.connect(MONGO_URL)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch((err) => console.error('❌ Error Mongo:', err));

// Passport
initializePassport();
app.use(passport.initialize());

// ----- Inyección (manual) -----

// DAOs
const usersDAO = new UsersDAO();
const productsDAO = new ProductsDAO();
const cartsDAO = new CartsDAO();
const ticketsDAO = new TicketsDAO();

// Repos
const usersRepo = new UsersRepository(usersDAO);
const productsRepo = new ProductsRepository(productsDAO);
const cartsRepo = new CartsRepository(cartsDAO);
const ticketsRepo = new TicketsRepository(ticketsDAO);

// Services
const authService = new AuthService(usersRepo, cartsRepo);
const productsService = new ProductsService(productsRepo);
const cartsService = new CartsService(cartsRepo, productsRepo);
const purchaseService = new PurchaseService(cartsRepo, productsRepo, ticketsRepo);

// Controllers
const sessionsController = new SessionsController(authService);
const productsController = new ProductsController(productsService);
const cartsController = new CartsController(cartsService, purchaseService);

// Routers
app.use('/api/sessions', buildSessionsRouter(sessionsController));
app.use('/api/products', buildProductsRouter(productsController));
app.use('/api/carts', buildCartsRouter(cartsController));

// Health check
app.get('/', (req, res) => res.send('OK'));

// Listen
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
