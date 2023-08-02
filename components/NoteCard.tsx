import React from "react";
import { Note } from "@prisma/client";
import { useNotes } from "@/context/NotesContext";
import { HiTrash, HiPencil } from "react-icons/hi";

const NotedCard = ({ note }: { note: Note }) => {

  const { DeleteNote, setSelectedNote } = useNotes();

  return (
    <div
      key={note.id}
      className="bg-slate-400 p-4 my-2 flex justify-between rounded-md">
      <div>
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <p>{note.content}</p>
        <p>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="flex gap-x-2">
        <button
          onClick={ async () => {
            if(confirm('¿Are you sure want to Delete this note?')){
                await DeleteNote(Number(note.id));
            }
          }}>
            <HiTrash className="text-2xl text-red-700"/>
            </button>
        <button
        onClick={() => {
          setSelectedNote(note)
        }}
        >
          <HiPencil className="text-2xl"/>
        </button>
      </div>
    </div>
  );
};

export default NotedCard;
