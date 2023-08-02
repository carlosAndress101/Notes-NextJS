"use client"

import NoteForm from "@/components/NoteForm";
import { useEffect} from 'react';
import { useNotes } from '@/context/NotesContext';
import NoteCard from '@/components/NoteCard'


const HomePage = () => {
  
  const {notes, loadNotes} = useNotes();

  useEffect(()=>{
    loadNotes();
  },[])

  return (
    <div className=" flex justify-center items-center h-screen">
      <div>
        <NoteForm />
        {notes.map((note) => (
          <NoteCard note={note} key={note.id}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
