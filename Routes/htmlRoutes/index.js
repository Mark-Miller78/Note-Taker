const router = require('express').Router();
const path = require('path');

//sets route to landing page
router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

//sets route to notes page
router.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname,'../../public/notes.html'));
});

//anything else goes to landing page
router.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;