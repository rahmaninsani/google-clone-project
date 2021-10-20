import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

// useDebounce untuk proyek lebih rumit
// Contoh pas ngetik di Google muncul suggestion, itu membebani API karena terus request, kalo pake debounce bisa diatur setiap berapa milisecond request nya

import { useResultContext } from "../contexts/ResultContextProvider";
import { Links } from "./Links";

export const Search = () => {
  const [text, setText] = useState("Elon Musk");
  const { setSearchTerm } = useResultContext();
  const [debouncedValue] = useDebounce(text, 300);

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      <input type="text" value={text} className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg" placeholder="Type something" onChange={(e) => setText(e.target.value)} />
      {!text && (
        <button type="button" className="absolute top-1.5 right-4 text-2xl text-gray-500" onClick={() => setText("")}>
          X
        </button>
      )}
      <Links />
    </div>
  );
};
