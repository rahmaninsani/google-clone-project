import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // type = /videos, /images, /search, /news
  const getResults = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: {
        "x-user-agent": "desktop",
        "x-rapidapi-host": "google-search3.p.rapidapi.com",
        "x-rapidapi-key": "100c74d725msh3f95fe0d7126a2dp15ff62jsnefdced790d12",
      },
    });

    const data = await response.json();
    setResults(data);
    setIsLoading(false);
  };

  return <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>{children}</ResultContext.Provider>;
};

export const useResultContext = () => useContext(ResultContext);
