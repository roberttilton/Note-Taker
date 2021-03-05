const path = require('path');
const router = require('express').Router();

//bring in /notes route with the notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

//create a permanent route to respond with the index html file when any other route is hit
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router;