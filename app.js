console.log('starting app.js..');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions = {
  describe: 'Title of Note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of Note',
  demand: true,
  alias: 'b'
};

const argv = yargs
.command('add','Add a new note', {
  title:titleOptions,
  body: bodyOptions
})
.command('list', 'List all Notes')
.command('read', 'Read a note', {
  title:titleOptions
})
.command('remove', 'Remove a note', {
  title:titleOptions
})
.help()
.argv;

var command = process.argv[2];
console.log(command);

if (command === 'add')
{
  console.log('Adding new note');
  var note = notes.addNote(argv.title, argv.body);
  if(note)
  {
    notes.logNote(note);
  }
  else{
    console.log("duplicate found");
  }
}
else if (command === 'list')
{
  console.log('Listing all notes');
  var allNotes = notes.getAll();
  console.log(`printing ${allNotes.length}`);
  allNotes.forEach((note) => notes.logNote(note));
}
else if (command === 'read')
{
  console.log('Reading note');
  var noteFound = notes.getNote(argv.title);
  if(noteFound)
  {
    console.log('note found');
    notes.logNote(noteFound);
  }
  else{
    console.log('Note not found');
  }
}
else if (command === 'remove')
{
  console.log('Removing note');
  var noteremoved = notes.removeNote(argv.title);
  if(noteremoved)
  {
    console.log('Note removed');
  }else{
    console.log('Note not removed');
  }
}
else{
  console.log('command not found');
}
