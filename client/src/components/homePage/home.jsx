import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import filterGameByPlatform, {
  getGenres,
  getVideogames,
  filterGamesByGenre,
  filterGamesByCreated,
  sortByName,
  sortByRating,
  getPlatforms,
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
  const allPlatforms = useSelector((state) => state.platforms);

  // USEEFFECT:
  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  // CONSTANTES/VARIABLES:
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allVideoGames.slice(indexOfFirstGame, indexOfLastGame);

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
        <div className={s.div_buttons}>
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
        </div>
        <div className={s.div_filters_sorts}>
          <div>
            <div className={s.div_filters}>
              <h2>Filter by:</h2>
              <select name="" id="" onChange={(e) => handleFilterGenre(e)}>
                <option value="All">ALL GENRES</option>
                {allGenres.map((el) => (
                  <option value={el.name} key={el.name}>
                    {el.name.toUpperCase()}
                  </option>
                ))}
              </select>
              <div>
                <select name="" id="" onChange={(e) => handleFilterCreated(e)}>
                  <option value="All">ALL VIDEOGAMES</option>
                  <option value="DB">ONLY DATA BASE GAMES</option>
                  <option value="API">ONLY API GAMES</option>
                </select>
              </div>
            </div>
          </div>
          <div className={s.div_sorts}>
            <h2>Order by:</h2>
            <div>
              <select name="" id="" onChange={(e) => handleSortByName(e)}>
                <option value="asc">A-Z</option>
                <option value="des">Z-A</option>
              </select>
            </div>
            <div>
              <select name="" id="" onChange={(e) => handleSortByRating(e)}>
                <option value="bestr">WORST RATINGS</option>
                <option value="worstr">BEST RATINGS</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={s.currenGames}>
        {currentGames &&
          currentGames.map((vg) => {
            return (
              <div>
                <Card
                  genreBD={vg.createInDb ? vg.genres : []}
                  genreAPI={!vg.createInDb ? vg.genres : []}
                  key={vg.name}
                  name={vg.name}
                  genre={vg.genres + ""}
                  rating={vg.rating}
                  image={vg.image}
                  id={vg.id}
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
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
