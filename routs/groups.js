const router = require("express").Router();

// send all groups
router.get('/groups', (req, res) => {
    
})
// create new group
router.put('/groups', (req, res) => {
    console.log(req.body);
    res.status(200);
    res.send();
})
// edit group
router.post('/groups', (req, res) => {
    
})
// delete group
router.delete('/groups', (req, res) => {
    
})

module.exports = router;