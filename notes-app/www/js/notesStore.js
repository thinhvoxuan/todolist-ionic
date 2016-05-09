angular.module('mynotes.notestores', [])
  .factory('NoteStore', function (){
  var notes = angular.fromJson(window.localStorage['notes'] || '[]');

  function persit(){
    window.localStorage['notes'] = angular.toJson(notes);
  }

  return {
    list : function(){
      return notes
    },
    get : function(noteId){
      for (var idx = 0; idx < notes.length; idx++){
        if (notes[idx].id == noteId){
          return notes[idx];
        }
      }
    },
    update: function(newNote){
      for (var idx = 0; idx < notes.length; idx++){
        if (notes[idx].id == newNote.id){
          notes[idx] = newNote;
          persit()
        }
      }
    },
    add: function(newNote){
      notes.push(newNote);
      persit()
    },
    delete: function(noteId){
      for (var idx = 0; idx < notes.length; idx++){
        if (notes[idx].id == noteId){
          notes.splice(idx, 1);
          persit()
        }
      }
    },
    move: function(note, fromIndex, toIndex){
      notes.splice(fromIndex, 1);
      notes.splice(toIndex, 0, note);
      persit();
    }
  }
});
