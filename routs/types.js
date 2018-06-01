const router = require("express").Router();
const { pool } = require("../db/db-connection");

router.put('/', (req, res) => {
    const text = `INSERT INTO types(_type) VALUES($1)
                    RETURNING id`;
    const values = [req.body._type];
    pool.connect()
    .then(client => {
        client.query(text, values)
        .then(data => {
            client.release();
            console.log(data.rows[0]);
            const _type = {_type:req.body._type, id:data.rows[0].id};
            res.status(200).jsonp({_type:_type});
        })
        .catch(err => {
            console.error('error in query', err.stack);
            client.release();
            res.status(400).send();
        });
    })
    .catch(err => {
        console.error('error in connection', err);
        res.status(400).send();
    });
});

router.get('/', (req, res) => {
    const text = 'SELECT id, _type FROM types';
    pool.connect()
    .then(client => {
        client.query(text)
        .then(data => {
            client.release();
            const ans = {types:data.rows};
            res.status(200).jsonp(ans);
        })
        .catch(err => {
            client.release();
            console.error('error in query', err);
            res.status(400).send();
        });
    })
    .catch(err => {
        console.error('error in connection', err);
    });
});

router.post('/', (req, res) => {
    const { id, _type} = req.body;
    const text = `UPDATE types SET _type=$2 WHERE id=$1
        RETURNING id, _type`;
    const values = [id, _type];
    console.log(req.body);
    pool.connect()
    .then(client => {
        client.query(text, values)
        .then(data => {
            console.log(data.rows);
            client.release();
            res.status(200).send();
        })
        .catch(err => {
            client.release();
            console.error('error in query', err.stack);
            res.status(400).send();
        });
    })
    .catch(err => {
        console.error('error in connection', err);
        res.status(400).send();
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const text = 'DELETE FROM types WHERE id=$1';
    const values = [id];
    pool.connect()
    .then(client => {
        client.query(text, values)
        .then(data => {
            client.release();
            res.status(200).send();
        })
        .catch(err => {
            client.release();
            console.error('error in query', err);
            res.status(400).send();
        });
    })
    .catch(err => {
        console.error('error in connection', err);
        res.status(400).send();
    });
});

module.exports = router;