// import items needed
const router = require('express').Router();
const db = require('../db/db.json');
const fs = require('fs');

// make a GET request with all notes from the database

router.get('/notes', (req, res) => {
    res.json(db);
})

// create a post request
router.post('/notes', (req, res) => {
    // store
    req.body.id = Math.floor(Math.random() * Math.floor(1000));
    db.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
})
// create a delete request
router.delete('/notes/:id', (req, res) => {
    // store
    console.log(req.params.id);
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        console.log(dbData);
        for (let i = 0; i < dbData.length; i++) {
            if (dbData[i].id == req.params.id) {
                console.log("found note");
                dbData.splice(i, 1);
                console.log(dbData);
            }
        }
        fs.writeFileSync('./db/db.json', JSON.stringify(dbData));
    });
    res.json(db);
})


module.exports = router;