import React, { useState, useEffect } from "react";
import { fetchShow } from './api/fetchShow';
import Dropdown from "react-dropdown";
import parse from "html-react-parser";

import { formatSeasons } from "./utils/formatSeasons";

import Episodes from "./components/Episodes";
import "./styles.css";

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const episodes = seasons[selectedSeason] || [];

  useEffect(() => {
    // const fetchShow = () => {
    //   axios
    //     .get(
    //       "https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes"
    //     )
    fetchShow()
        .then(res => {
          console.log('fetchshow res.data:', res.data);
          setShow(res.data);
          setSeasons(formatSeasons(res.data._embedded.episodes));
          console.log('seasons: ', seasons);
        });
    // };
    // fetchShow();
  }, []);

  const handleSelect = e => {
    setSelectedSeason(e.value);
  };

  if (!show) {
    return <h2>Fetching data...</h2>;
  }

  return (
    <div className="App">
      <img className="poster-img" src={show.image.original} alt={show.name} />
      <h1>{show.name}</h1>
      {parse(show.summary)}
      <Dropdown
        options={Object.keys(seasons)}
        onChange={handleSelect}
        value={selectedSeason || "Select a season"}
        placeholder="Select an option"
      />
      <Episodes episodes={episodes} />
    </div>
  );
}
