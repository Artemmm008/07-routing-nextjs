'use client';

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview"; 
import Modal from "@/components/Modal/Modal"; 

export default function NotePreviewClient() {
  const router = useRouter();
  
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  return (
  <Modal onClose={handleClose}>
    {isLoading && <div>Loading...</div>}
    {isError && <div>Error loading note.</div>}
    {note && <NotePreview note={note} />}
  </Modal>
  );
  
}