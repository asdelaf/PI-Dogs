const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const DogRoute = require('./dogs');
const TemperamentRoute = require('./temperaments');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", DogRoute);
router.use("/temperaments", TemperamentRoute);


module.exports = router;