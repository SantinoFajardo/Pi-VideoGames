import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName, getVideogames } from "../../Actions";
import s from "./searchBar.module.css";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  async function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    await dispatch(getVideogamesByName(name));
    setCurrentPage(1);
  }

  function setSearch(e) {
    e.preventDefault();
    setName("");
    dispatch(getVideogames());
    setCurrentPage(1);
  }

  return (
    <div className={s.conteiner}>
      <input
        className={s.input}
        type="text"
        value={name}
        placeholder="Search videogame by name"
        onChange={(e) => handleInputChange(e)}
      />
      <button className={s.button} onClick={(e) => setSearch(e)}>
        REFRESH SEARCH
      </button>
    </div>
  );
}
