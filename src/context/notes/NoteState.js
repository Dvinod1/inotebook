import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
   
   const notesInitial=[
    {
      "_id": "63f5b4928946cf3ae465f381",
      "user": "63f46688a82159354aa05d8c",
      "description": "Hi hello how are you ",
      "tag": "new Note",
      "title": "My title",
      "date": "2023-02-22T06:22:10.028Z",
      "__v": 0
    },
    {
      "_id": "63f5bd238946cf3ae465f384",
      "user": "63f46688a82159354aa05d8c",
      "description": "Add new note to your app ",
      "tag": "Note one",
      "title": "New Note",
      "date": "2023-02-22T06:58:43.734Z",
      "__v": 0
    },
    {
      "_id": "63f5b4928946cf3ae465f381",
      "user": "63f46688a82159354aa05d8c",
      "description": "Hi hello how are you ",
      "tag": "new Note",
      "title": "My title",
      "date": "2023-02-22T06:22:10.028Z",
      "__v": 0
    },
    {
      "_id": "63f5bd238946cf3ae465f384",
      "user": "63f46688a82159354aa05d8c",
      "description": "Add new note to your app ",
      "tag": "Note one",
      "title": "New Note",
      "date": "2023-02-22T06:58:43.734Z",
      "__v": 0
    },
    {
      "_id": "63f5b4928946cf3ae465f381",
      "user": "63f46688a82159354aa05d8c",
      "description": "Hi hello how are you ",
      "tag": "new Note",
      "title": "My title",
      "date": "2023-02-22T06:22:10.028Z",
      "__v": 0
    },
    {
      "_id": "63f5bd238946cf3ae465f384",
      "user": "63f46688a82159354aa05d8c",
      "description": "Add new note to your app ",
      "tag": "Note one",
      "title": "New Note",
      "date": "2023-02-22T06:58:43.734Z",
      "__v": 0
    },
  ]

  const [notes , setnotes]= useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes, setnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
