const router = require("express").Router();
const passport = require("passport");

router.get('/login', (req, res) => {
   // toDo send login page 
});

router.get('/logout', (req, res) => {
    // toDo Logout logic
    req.logout();
    res.status(200);
    res.jsonp({logout: true});
});

module.exports = router;