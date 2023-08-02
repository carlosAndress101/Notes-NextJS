"use client";
import React, { createContext, useState, useContext } from "react";
import {CreateNote, UpdateNote} from '@/interfaces/Notes'
import {Note} from '@prisma/client'


//crear un contexto
export const NoteContext = createContext<{
  notes: Note[];
  loadNotes: () => Promise<void>;
  createNote: (note: CreateNote) => Promise<void>
  DeleteNote: (id: number) => Promise<void>
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  UpdateNote: (id: number, note: UpdateNote) => Promise<void>;
}>({
  notes: [],
  loadNotes: async () => {},
  createNote: async (note: CreateNote) => {},
  DeleteNote: async (id: number) => {},
  selectedNote: null,
  setSelectedNote: (note: Note | null)=>{},
  UpdateNote: async (id: number, note: UpdateNote) => {},
});

//Hook de importacion
export const useNotes = () => {
    const context = useContext(NoteContext);
    if(!context){
        throw new Error('useNotes must be within a NotesProvider')
    }
    return context
}

//provider que envuelve todas nuestra peticiones y creaciones
export const NoteProvider = ({ children }: { children: React.ReactNode }) => {

  //estados
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  //cargar nota
  const loadNotes = async () => {
    const res = await fetch("http://localhost:3000/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  // Crear nuevas notas
  const createNote = async (note:CreateNote) => {

    const res = await fetch("api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "content-Type": "application/json",
      },
    });
    const newNote = await res.json();
    setNotes([... notes, newNote]);
  };

  //Delete Notas
  const DeleteNote = async (id: number) => {
    const res = await fetch(`api/notes/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      setNotes(notes.filter((notes)=> notes.id !== id));
  };

  const UpdateNote = async (id: number, note: UpdateNote) =>{

    const res = await fetch(`api/notes/${id}`, {
      method:"PUT",
      body: JSON.stringify(note),
      headers:{
        "content-Type": "application/json",
      }
    });
    const data = await res.json();
    setNotes(notes.map((note)=> (note.id === id ? data: note)))
  }

  return (
    <NoteContext.Provider value={{ notes, loadNotes, createNote, DeleteNote, selectedNote, setSelectedNote, UpdateNote }}>
      {children}
    </NoteContext.Provider>
  );
};
