const router = require("express").Router();
const { pool } = require("../db/db-connection");

// send all groups
router.get('/groups', (req, res) => {
    
});
// create new group
router.put('/groups', async (req, res) => {
    const text = 'INSERT INTO groups(name) VALUES($1)';
    const values = [req.body.name];
    pool.connect().then(
        client => {
            console.log(client);
            return client.query(text, values)
            .then(dbRes => {
                client.release();
                console.log(dbRes);
            })
            .catch(e => {
                client.release();
                console.error('error at query', e.stack);
            });
        })
        .catch(e => {
            console.error('error at connection',e.stack);
        });
    res.status(200).send();
});
// edit group
router.post('/groups', (req, res) => {
    
});
// delete group
router.delete('/groups', (req, res) => {
    
});

module.exports = router;