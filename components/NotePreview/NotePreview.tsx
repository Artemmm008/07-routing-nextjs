'use client';

import { useRouter } from "next/navigation";
import { Note } from "@/types/note";
import css from "./NotePreview.module.css";

type Props = {
  note: Note;
};

const NotePreview = ({ note }: Props) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  }

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
      <button className={css.backBtn} onClick={handleClose}>Close</button>
    </div>
  );
};
  
export default NotePreview;