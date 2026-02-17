import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "../../Notes.client";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const category = slug?.[0] === 'all' ? undefined : slug?.[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, category],
    queryFn: () => fetchNotes("", 1, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={category} />
    </HydrationBoundary>
  );
}