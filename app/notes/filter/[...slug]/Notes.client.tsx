"use client";

import NoteList from "@/components/NoteList/NoteList";
import css from "./NotesPage.module.css";
import { fetchNotes } from "@/lib/api";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import { NoteTag } from "@/types/note";
import Link from "next/link";

interface NotesProps {
  tag?: NoteTag;
}

function NotesClient({ tag }: NotesProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedQuery] = useDebounce(query, 500);

  const handleSearch = (text: string) => {
    setQuery(text);
    setPage(1);
  };

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page, debouncedQuery, tag],
    queryFn: () =>
      fetchNotes({ page: page, perPage: 12, search: debouncedQuery, tag: tag }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleSearch} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      {isSuccess && <NoteList notes={data.notes} />}
    </div>
  );
}

export default NotesClient;
