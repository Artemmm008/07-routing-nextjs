'use client';

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview"; 
import Modal from "@/components/Modal/Modal"; 

export default function NotePreviewClient() {
  const router = useRouter();
  const { id } = useParams();

  const { data: note } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id as string),
  });

  if (!note) return null;

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <NotePreview note={note} />
    </Modal>
  );
}