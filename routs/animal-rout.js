const router = require("express").Router();
const { pool } = require("../db/db-connection");

    /*
    temporary expample recusion
    # define temp table name family_tree for the recursion
        WITH RECURSIVE family_tree(id, gov_id, gen_1, gen_2) AS (
    # select columns from db table animals_new with the selected animal
            SELECT id, gov_id, gen_1, gen_2
            FROM animals_new
            WHERE id = 18
            UNION ALL
    # select the ancestor from the db table and add to the temp table
                SELECT a.id, a.gov_id, a.gen_1, a.gen_2
                FROM animal_new a, family_tree f
    # the recusion will stop when condition no longer applay
                WHERE a.id = f.gen_1
        )
    # select all animals from temp table and limit the recursion to 5 iterations
        SELECT id, gov_id, gen_1, gen_2
        FROM family_tree
        LIMIT = 5;
    */
router.get('/', (req, res) => {
    pool.connect()
    .then(client => {
        const text = `SELECT id, iron_num, herd_num, gov_id, gender, pregnant, birth_date, gen_1, animal_type, comments, ARRAY(
        SELECT c.time FROM calvings c WHERE c.animal_id = id
            ORDER BY c.time ASC) AS calving_times, 
        ARRAY( SELECT c.litter_size FROM calvings c WHERE id = c.animal_id ORDER BY c.time ASC ) AS calving_sizes,
        ARRAY(SELECT u.quality FROM udder_quality u WHERE u.animal_id = id 
            ORDER BY u.time DESC ) AS udder, 
        (SELECT t._type AS _type FROM types t WHERE t.id = animal_type )
        FROM animals_new WHERE time_of_death IS NULL`;
        client.query(text)
        .then(data => {
            client.release();
            console.log(data.rows);
            const animals = data.rows.map(o => o);
            res.status(200).jsonp({animals:animals});
        }).catch(err => {
            client.release();
            console.error('error in get animals query', err.stack);
            res.status(400).send();
        });
    }).catch(err => {
        console.error('db connection error in get animals', err.stack);
        res.status(400).send();
    });
    
});

router.put('/', (req, res) => {
    console.log(req.body);
    const animal = req.body;
    ( async () => {
        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');
            const mother = animal.gen_1 && animal.gen_1.length ? 
                await client.query('SELECT id FROM animals_new WHERE gov_id=$1', [animal.gen_1]) : null;
            const gen_1 = mother && mother.rows[0].id ? mother.rows[0].id : null;
            
            const insertAnimalText = `INSERT INTO animals_new(iron_num, herd_num, gender, pregnant, birth_date, vaccine_1, vaccine_2, gen_1, gov_id, animal_type) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                    RETURNING id`;
            const insertAnimalValues = [animal.iron_num, animal.herd_num, animal.gender, false, animal.birth_date, false, false, gen_1, animal.gov_id, animal.animal_type];
            console.log(typeof animal.animal_type);
            const { rows } = await client.query(insertAnimalText, insertAnimalValues);
            console.log(rows[0].id);
            
            const insertAnimalGroupText = 'INSERT INTO animal_group(animal_id, group_id) VALUES($1, $2)';
            const insertAnimalGroupValues = [rows[0].id, animal.group_id];
            await client.query(insertAnimalGroupText, insertAnimalGroupValues);
            await client.query('COMMIT');
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    })().catch(err => {console.error(err.stack)});
    res.status(200).send();
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send();
});

router.delete('/:id', (req, res) => {
    console.log(req.params);
    res.status(200).send();
})

module.exports = router;