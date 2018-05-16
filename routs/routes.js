const router = require("express").Router();

const animalRoutes = require("./animal-rout");
const authRoutes = require("./auth");
const groupsRoutes = require("./groups");
const typesRoutes = require("./types");

router.use('/api/animals', animalRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/groups', groupsRoutes);
router.use('/api/types', typesRoutes);

module.exports = router;