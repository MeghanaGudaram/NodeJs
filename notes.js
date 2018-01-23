console.log('starting notes.js...');

const fs = require('fs');

var fetchNotes = () => {
  try{
    var noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  } catch(e){
    return [];
  }
};
var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};
var addNote =(title, body) => {
  console.log('Adding note', title, body);
  var notes = fetchNotes();
  var note = {
    title: title,
    body
  };

  var duplicateNotes=notes.filter((note) => note.title === title);
  if(duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  console.log('Getting all notes');
  return fetchNotes();
}

var getNote = (title) => {
  console.log('Getting Note', title);
  var notes = fetchNotes();
  var filterednote=notes.filter((note) => note.title === title);
  return filterednote[0];
};

var removeNote = (title) => {
  console.log('Removing Note', title);
  var notes = fetchNotes();
  var filterednotes=notes.filter((note) => note.title !== title);
  saveNotes(filterednotes);
  return(notes.length!==filterednotes.length);
};

var logNote = (note) => {
  debugger;
  console.log('---');
  console.log(`Title:  ${note.title}`);
  console.log(`Body: ${note.body}`);
}

module.exports = {
  addNote: addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
