"use client"
import React, { useState } from "react"
import { useNotes } from '@/context/NotesContext'
const NoteForm = () => {

    const [title, setTitle] = useState('')
    const [content, setTContent] = useState('')

    const {createNote} = useNotes();

    const handlerSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await createNote({
            title,
            content
        });
        setTitle("")
        setTContent("")
    }

  return (
    <form onSubmit={handlerSubmit}>
      <input type="text" name="title" autoFocus placeholder="Title" className="w-full px-4 py-2 text-black bg-white
      rounded-md focus:outline-none focus: right-2 focus:ring-blue-600 my-2" onChange={(e) => setTitle(e.target.value)}
      value={title}/>

      <textarea name="content" autoFocus placeholder="Content" className="w-full px-4 py-2 text-black bg-white
      rounded-md focus:outline-none focus:right-2 focus:ring-blue-600 my-2" onChange={(e) => setTContent(e.target.value)} 
      value={content}></textarea>

      <button className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">create</button>
    </form>
  )
}

export default NoteForm
