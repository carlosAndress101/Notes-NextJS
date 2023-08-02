"use client"
import React, { useEffect, useState } from "react"
import { useNotes } from '@/context/NotesContext'
const NoteForm = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const {createNote, selectedNote, setSelectedNote, UpdateNote} = useNotes();
    useEffect(()=>{
      if(selectedNote){
        setTitle(selectedNote.title);
        setContent(selectedNote.content || ""); // validamos que sea el valoro un string vacio.
      }
    },[selectedNote])
 
    const handlerSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(selectedNote){
          await UpdateNote(selectedNote.id, {
            title,
            content
          })
          setSelectedNote(null)
        }else{
          await createNote({
            title,
            content
          });
        }
        setTitle("")
        setContent("")
    }

  return (
    <form onSubmit={handlerSubmit}>
      <input type="text" name="title" autoFocus placeholder="Title" className="w-full px-4 py-2 text-black bg-white
      rounded-md focus:outline-none focus: right-2 focus:ring-blue-600 my-2" onChange={(e) => setTitle(e.target.value)}
      value={title}/>

      <textarea name="content" autoFocus placeholder="Content" className="w-full px-4 py-2 text-black bg-white
      rounded-md focus:outline-none focus:right-2 focus:ring-blue-600 my-2" onChange={(e) => setContent(e.target.value)} 
      value={content}></textarea>

      <div className="flex justify-end gap-2">
        {/* boton de crear */}
        <button className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed" 
        disabled={!title || !content}
        type="submit">
          {selectedNote ? "Update" : "Create"}</button>
        {/* boton de cancelar */}
        {selectedNote && (
        <button className="px-5 py-2 text-black bg-red-600 rounded-md hover:bg-red-500" 
        type="button" 
        onClick={()=>{
          setSelectedNote(null);
          setTitle("")
          setContent("")
        }}>Cancel</button>
        )}
      </div>
    </form>
  )
}

export default NoteForm
