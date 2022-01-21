const router =require('express').Router();
const {v4: uuidv4} = require('uuid');
const {createNewNote, validateNote, deleteNote} = require('../../lib/notes');
const notes = require('../../db/db.json');


router.get('/notes', (req, res)=>{
    res.json(notes);
});

router.post('/notes', (req, res)=>{
    //set id based off length of notes array
    req.body.id = uuidv4();

    //if any data in req.body is incorrect send 400 error back
    if(!validateNote(req.body)){
        res.status(400).send('The note is missing a title or text');
    } else {
        //add notes to json file and notes array
        const note = createNewNote(req.body, notes);
        res.json(note);  
    }
});

router.delete('/notes/:id', (req, res)=>{
    const id = req.params.id.toString();
    deleteNote(id, notes);
    res.json(notes);
});

module.exports =router;

