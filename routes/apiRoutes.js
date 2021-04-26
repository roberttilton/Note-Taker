const path = require("path");
const fs = require("fs");
const router = require('express').Router();
let notes = require("../db/db.json")

router.route('/notes')
    .get((req, res) => {
        res.json(notes)
    })
    .post((req, res) => {
        const newNote = req.body;

        let id = 1;

        if (notes.length === 0) {
            newNote.id = 1
        } else {
            newNote.id = id + 1
        }

        notes.push(newNote);
        let jsonNotes = JSON.stringify(notes)
        fs.writeFile("./db/db.json", jsonNotes, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Success!");
        })
        res.json(true)
    })

router.route('/notes/:id')
    .get((req, res) => {
        const id = req.params.id;
        let find;
        notes.forEach(n => {
            if (id == n.id) {
                find = n;
                return res.json(n)
            }
        })
        res.json(false)
    })
    .delete((req, res) => {
        const id = req.params.id;
        console.log(id)
        notes.forEach((n, index) => {
            if (id == n.id) {
                notes.splice(index, 1)
                const notesCopy = notes.slice();
                let jsonNotes = JSON.stringify(notesCopy)
                fs.writeFile("./db/db.json", jsonNotes, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Successfully deleted!");
                })

            }
        })
        res.json(true);
    })


module.exports = router;