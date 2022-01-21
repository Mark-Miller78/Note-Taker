const fs = require('fs');
const path = require('path');
const notes = require('../db/db.json');

function createNewNote(body, notesArr){
    const note = body;
    notesArr.push(note);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
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
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(notes, null, 2)
            );
            break;
        }
    };
}

module.exports={
    createNewNote,
    validateNote,
    deleteNote
}