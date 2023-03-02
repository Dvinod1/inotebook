import { useState } from "react";
// import { json } from "react-router-dom";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  //Add Note function 
  const addNote = async (title, description, tag) => {
    //  api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth_token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = response.json();
    setNotes(notes.concat(note))
  }



  //get note function
  const getNotes = async () => {
    //  api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth_token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)

  }
  //Delete Note 
  const deleteNote = async (id) => {
    //Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth_token": localStorage.getItem('token')
      },

    });
    const json = await response.json();
    console.log(json)


    console.log("deleting note with id" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }


  //Edit Note
  const editNote = async (id, title, description, tag,) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth_token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // LOGIC TO EDIT IN CLINT 
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break

      }

    }
    setNotes(newNotes)
    console.log(notes)


  }


  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState
