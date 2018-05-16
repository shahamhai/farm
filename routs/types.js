const router = require("express").Router();
const { pool } = require("../db/db-connection");

router.put('/', (req, res) => {
    const text = 'INSERT INTO types(_type) VALUES($1)';
    const values = [req.body.animalType];
    pool.connect()
    .then(client => {
        client.query(text, values)
        .then(data => {
            client.release();
            res.status(200).send();
        })
        .catch(err => {
            console.error('error in query', err);
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
            const types = data.rows;
            res.status(200).jsonp(types);
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
    const { id, _type} = req.body._type;
    const text = 'UPDATE types WHERE id=$1 SET _type=$2';
    const values = [id, _type];
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