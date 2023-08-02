"use client";
import React, { createContext, useState, useContext } from "react";
import {CreateNote} from '@/interfaces/Notes'
import {Note} from '@prisma/client'



export const NoteContext = createContext<{
  notes: Note[];
  loadNotes: () => Promise<void>;
  createNote: (note: CreateNote) => Promise<void>
  DeleteNote: (id: number) => Promise<void>
}>({
  notes: [],
  loadNotes: async () => {},
  createNote: async (note: CreateNote) => {},
  DeleteNote: async (id: number) => {},
});

export const useNotes = () => {
    const context = useContext(NoteContext);
    if(!context){
        throw new Error('useNotes must be within a NotesProvider')
    }
    return context
}

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

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

  return (
    <NoteContext.Provider value={{ notes, loadNotes, createNote, DeleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};
