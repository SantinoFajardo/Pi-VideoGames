import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  // getVideogamesByName,
  getVideogames,
  // getVideogamesByReleased,
  getVideogamesByReleasedAndName,
} from "../../Actions";
import s from "./searchBar.module.css";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();

  // ESTADOS LOCALES
  const [input, setInput] = useState({
    name: "",
    released: "",
  });

  // FUNCIONES
  async function handleInputChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    await dispatch(getVideogamesByReleasedAndName(input.name, input.released));
    setCurrentPage(1);
  }

  async function setSearch(e) {
    e.preventDefault();
    setInput({
      name: "",
      released: "",
    });
    await dispatch(getVideogames());
    setCurrentPage(1);
  }

  return (
    <div className={s.conteiner}>
      <div className={s.divConteiner}>
        <input
          className={s.input}
          type="text"
          value={input.name}
          placeholder="Search videogame by name"
          onChange={(e) => handleInputChange(e)}
          name="name"
        />
        <button className={s.button} onClick={(e) => setSearch(e)}>
          REFRESH SEARCH
        </button>
        <input
          className={s.input}
          type="text"
          value={input.released}
          placeholder="Search videogame by released year"
          onChange={(e) => handleInputChange(e)}
          name="released"
        />
      </div>
    </div>
  );
}
