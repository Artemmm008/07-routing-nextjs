"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useParams } from "next/navigation";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import css from "./NotesPage.module.css"; 

export default function NotesClient() {
  const { slug } = useParams();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const category = slug?.[0] === 'all' ? undefined : slug?.[0];
    
  const [debouncedSearch] = useDebounce(search, 300);

  const { data } = useQuery({
    queryKey: ["notes", debouncedSearch, page, category],
    queryFn: () => fetchNotes(debouncedSearch, page, category),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox 
          value={search} 
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); 
          }} 
        />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}        
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
          />
        )}
      </header>

      <main>
        {data && data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <p>No notes found for category: {category || 'all'}</p>
        )}
      </main>
    </div>
  );
}