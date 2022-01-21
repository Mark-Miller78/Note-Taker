const express=require('express');
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid');


const app=express();
const PORT = process.env.PORT || 3001;

const notes = require('./db/db.json');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

function findById(id, notesArr) {
    const result = notesArr.filter(notes => notes.id === id)[0];
    return result;
};

function createNewNote(body, notesArr){
    const note = body;
    notesArr.push(note);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify( notesArr, null, 2)
    );

    return note;
}

function validateNote(note){
    if(!note.title){
        return false;
    }
    if(!note.text){
        return false;
    }
    return true;
}

function deleteNote(id, noteArr){

    for(let i=0; i<noteArr.length; i++){
        let note = noteArr[i];

        if(note.id === id){
            notes.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notes, null, 2)
            );
            break;
        }
    };
}

app.get('/api/notes', (req, res)=>{
    res.json(notes);
});

app.get('/api/notes/:id', (req, res)=>{
    const result = findById(req.params.id, notes);
    if(result){
        res.json(result);
    } else{
        res.send(404);
    }
});

app.post('/api/notes', (req, res)=>{
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

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.delete('/api/notes/:id', (req, res)=>{
    const id = req.params.id.toString();
    deleteNote(id, notes);
    res.json(notes);
});


app.listen(PORT, ()=>{
    console.log(`Note taking server now on port ${PORT}!`);
});