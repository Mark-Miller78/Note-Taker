//required modules to run
const fs = require('fs');
const path = require('path');
const notes = require('../db/db.json');

//creates new note
function createNewNote(body, notesArr){
    const note = body;
    notesArr.push(note);

    //writes file with new note inside
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify( notesArr, null, 2)
    );

    return note;
}

//validates all info required to make a new note is present
function validateNote(note){
    if(!note.title){
        return false;
    }
    if(!note.text){
        return false;
    }
    return true;
}

//deletes note
function deleteNote(id, noteArr){

    for(let i=0; i<noteArr.length; i++){
        let note = noteArr[i];

        //looks for note with same id and splices it from the array
        if(note.id === id){
            notes.splice(i, 1);
            //rewrites file without the deleted note
            fs.writeFileSync(
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(notes, null, 2)
            );
            break;
        }
    };
}

//exports functions
module.exports={
    createNewNote,
    validateNote,
    deleteNote
}