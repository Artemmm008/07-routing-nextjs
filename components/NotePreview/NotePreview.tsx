'use client';

import { useQuery } from "@tanstack/react-query";
import css from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";

const NotePreview = () => {
  const { id } = useParams();

  const router = useRouter();
  
  const close = () => router.back();
  
  const { data: note } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id as string)
  })
  
  if (!note) return null;
  
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString('uk-UA')}
        </p>
      </div>
      <button className={css.backBtn} onClick={close}>Close</button>
    </div>
  );
};

export default NotePreview;



