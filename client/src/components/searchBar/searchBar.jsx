import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../Actions";
import s from "./searchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getVideogamesByName(name));
    setName("");
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
      <button
        className={s.button}
        type="input"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
