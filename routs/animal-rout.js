const router = require("express").Router();

router.get('/animals', (req, res) => {
    console.log('api/animals was called');
    res.status(200);
    res.jsonp({
        "animals": [
            {"id":123, "gender":'F', "udderRank": 5, "gen1": 101, "gen2": 102, "gen3": 103, "gen4": 104, "gen5": 105, "births": 40, "desease":"", "pregnant":true, "comments":"some comment", "animalType":"animal type", "weaning": 80, "herdId": 555},
            {"id":223, "gender":'F', "udderRank": 5, "gen1": 201, "gen2": 202, "gen3": 203, "gen4": 204, "gen5": 205, "births": 40, "desease":"", "pregnant":true, "comments":"some comment", "animalType":"animal type", "weaning": 80, "herdId": 555}
        ]
    })
});

router.put('/animal', (req, res) => {
    console.log(req.body);
    res.status(200);
    res.send();
})

module.exports = router;