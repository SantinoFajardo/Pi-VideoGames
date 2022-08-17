import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenres,
  getVideogames,
  filterGamesByGenre,
  filterGamesByCreated,
  sortByName,
  sortByRating,
} from "../../Actions";
import { Link } from "react-router-dom";
import Card from "../VG Card/videoGameCard";
import Paging from "../Paging/paging";
import s from "./homePage.module.css";
import SearchBar from "../searchBar/searchBar";

export default function Home() {
  //ESTADOS LOCALES:
  const [currentPage, setCurrentPage] = useState(1); // Pagina actual
  const [gamesPerPage, setGamesPerPage] = useState(15); // games por pagina
  const [order, setOrder] = useState("");

  // DISPATCHS/STATES:
  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.videoGames);
  const allGenres = useSelector((state) => state.genres);

  // USEEFFECT:
  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  // CONSTANTES/VARIABLES:
  const indexOfLastGame = currentPage * gamesPerPage; //ej: en la pagina 1 el indice del ultimo game es 1 * 15 = 15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; //ej: en la pagina 1 el indice del primer game es 15 - 15 = 0
  const currentGames = allVideoGames.slice(indexOfFirstGame, indexOfLastGame); // los juegos de la pagina actual

  // FUNCIONES:
  let handleClick = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
  };

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleFilterGenre(e) {
    dispatch(filterGamesByGenre(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterGamesByCreated(e.target.value));
  }

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Tidy ${e.target.value}`);
  }

  function handleSortByRating(e) {
    e.preventDefault();
    dispatch(sortByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Tidy ${e.target.value}`);
  }

  return (
    <div className={s.container}>
      <div className={s.container_div}>
        <h1 className={s.title}>PI-SANTINO FAJARDO</h1>
        <SearchBar />
        <Link to="/videogames">
          <button>Put a videogame</button>
        </Link>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh page
        </button>
        <Link to="/">
          <button>Back to landing page</button>
        </Link>
        <div>
          <select name="" id="" onChange={(e) => handleFilterGenre(e)}>
            <option value="All">All</option>
            {allGenres.map((el) => (
              <option value={el.name} key={el.name}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select name="" id="" onChange={(e) => handleFilterCreated(e)}>
            <option value="All">All Videogames</option>
            <option value="DB">Only data base games</option>
            <option value="API">Only api games</option>
          </select>
        </div>
        <div>
          <select name="" id="" onChange={(e) => handleSortByName(e)}>
            <option value="asc">A-Z</option>
            <option value="des">Z-A</option>
          </select>
        </div>
        <div>
          <select name="" id="" onChange={(e) => handleSortByRating(e)}>
            <option value="bestr">Worst ratings</option>
            <option value="worstr">Best ratings</option>
          </select>
        </div>
      </div>
      <div>
        {currentGames &&
          currentGames.map((vg) => {
            return (
              <div>
                <Card
                  key={vg.name}
                  name={vg.name}
                  genre={vg.genres + ""}
                  rating={vg.rating}
                  image={vg.image}
                />
              </div>
            );
          })}
      </div>
      <div>
        <Paging
          gamesPerPage={gamesPerPage}
          allGames={allVideoGames.length}
          paging={paging}
        />
      </div>
    </div>
  );
}
