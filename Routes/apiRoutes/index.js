// initializes use of router
const router =require('express').Router();
//sets use of uuid
const {v4: uuidv4} = require('uuid');
//links to required functions
const {createNewNote, validateNote, deleteNote} = require('../../lib/notes');
//links to note database
const notes = require('../../db/db.json');

//retrieves notes in database
router.get('/notes', (req, res)=>{
    res.json(notes);
});

//saves new notes to database
router.post('/notes', (req, res)=>{
    //each note gets a unique id 
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

//deletes selected note
router.delete('/notes/:id', (req, res)=>{
    const id = req.params.id.toString();
    deleteNote(id, notes);
    res.json(notes);
});

module.exports =router;

