import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

const NotesPage = async ({ searchParams }: Props) => {
  const { search = "", page = "1" } = await searchParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", search, Number(page)],
    queryFn: () => fetchNotes(search, Number(page)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default NotesPage;