const express=require('express');

const app=express();
const PORT = process.env.PORT || 3001;

const notes = require('./db/db.json');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

function findById(id, notesArr) {
    const result = notesArr.filter(notes => notes.id === id)[0];
    return result;
};

app.get('/api/notes', (req, res)=>{
    res.json(notes);
});

app.get('/api/notes/:id', (req, res)=>{
    const result = findById(req.params.id, notes);
    res.json(result);
});


app.listen(PORT, ()=>{
    console.log(`Note taking server now on port ${PORT}!`);
});