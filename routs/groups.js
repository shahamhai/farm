const router = require("express").Router();
const { pool } = require("../db/db-connection");

// send all groups
router.get('/', (req, res) => {
    const text = `
        SELECT _id, name, (SELECT COUNT(group_id) AS animals FROM animal_group WHERE animal_group.group_id=groups._id) FROM groups;`;
    let groups = [];
    pool.connect()
    .then(client => {
        return client.query(text)
        .then(dbRes => {
            client.release();
            groups = dbRes.rows.map(row => {
                return {id: row._id, name: row.name, animals: row.animals};
                
            });
            res.status(200).jsonp({groups:groups});
        })
        .catch(e => {
            client.release();
            console.error('error in query', e.stack);
            res.status(400).send();
        });
    })
    .catch(e => {
        console.error('error in connection', e.stack);
        res.status(400).send();
    });
});
// create new group
router.put('/', (req, res) => {
    const text = 'INSERT INTO groups(name) VALUES($1)';
    const values = [req.body.name];
    pool.connect()
    .then(
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
                res.status(400).send();
            });
        })
        .catch(e => {
            console.error('error at connection',e.stack);
            res.status(400).send();
        });
    res.status(200).send();
});
// edit group
router.post('/', (req, res) => {
    const { name, id } = req.body;
    console.log('in /groups post', id, name);
    const text = 'UPDATE groups SET name=$2 WHERE _id=$1';
    const values = [id, name];
    pool.connect().then(client => {
        client.query(text, values)
        .then(dbRes => {
            client.release();
            console.log(dbRes.rows);
            res.status(200).send();
        })
        .catch(e => {
            client.release();
            console.error('error at query', e.stack);
        });
    })
    .catch(e => {
        console.error('error at connection', e.stack);
        res.status(400).send();
    });
});
// delete group
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const text = `DELETE FROM groups WHERE _id=$1`;
    const values = [id];
    pool.connect()
    .then(client => {
        client.query(text, values)
        .then(dbRes => {
            client.release();
            res.status(200).send();
        })
        .catch(e => {
            client.release();
            res.status(400).send();
            console.error('error in query', e.stack);
        });
    })
    .catch(e => {
        console.error('error in connection', e.stack);
        res.status(400).send();
    });
    
});

module.exports = router;