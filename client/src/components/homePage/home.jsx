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
  getPlatforms,
  deleteGame,
  deleteGame2,
  addGameToFavourites,
  removeGameToFavourites,
} from "../../Actions";
import { Link } from "react-router-dom";
import Card from "../VG Card/videoGameCard";
import Paging from "../Paging/paging";
import s from "./homePage.module.css";
import SearchBar from "../searchBar/searchBar";
import Loading from "../Loading/loading";

export default function Home() {
  //ESTADOS LOCALES:
  const [currentPage, setCurrentPage] = useState(1); // Pagina actual
  const [gamesPerPage, setGamesPerPage] = useState(15); // games por pagina
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("");

  // DISPATCHS/STATES:
  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.videoGames);
  const allGenres = useSelector((state) => state.genres);
  const allPlatforms = useSelector((state) => state.platforms);

  // USEEFFECT:
  useEffect(async () => {
    dispatch(getGenres());
    dispatch(getPlatforms());
    await dispatch(getVideogames());
    setLoading(true);
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

  const handleNext = () => {
    let lastpage = Math.ceil(allVideoGames.length / gamesPerPage);
    if (currentPage < lastpage) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  function handleFilterGenre(e) {
    dispatch(filterGamesByGenre(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    dispatch(filterGamesByCreated(e.target.value));
    setCurrentPage(1);
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

  function onClickDeleteGame(name, id) {
    dispatch(deleteGame(name));
    dispatch(deleteGame2(id));
  }

  function addToFavourites(name) {
    dispatch(addGameToFavourites(name));
  }
  function removesGameToFavourites(name) {
    dispatch(removeGameToFavourites(name));
  }

  return (
    <div className={s.container}>
      <div className={s.container_div}>
        <h1 className={s.title}>PI-SANTINO FAJARDO</h1>
        <div className={s.div_buttons}>
          <Link to="/videogames">
            <button>CREATE</button>
          </Link>
          <button
            className={s.refreshPage}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            REFRESH
          </button>
          <Link to="/">
            <button>BACK</button>
          </Link>
          <Link to="/favourites">
            <button className={s.buttonFavourites}>FAVOURITES</button>
          </Link>
        </div>
        <SearchBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
      <div className={s.div_filters_sorts}>
        <select name="genre" id="" onChange={(e) => handleFilterGenre(e)}>
          <option value="All">ALL GENRES</option>
          {allGenres.map((el) => (
            <option value={el.name} key={el.name}>
              {el.name.toUpperCase()}
            </option>
          ))}
        </select>
        <div>
          <select name="origin" id="" onChange={(e) => handleFilterCreated(e)}>
            <option value="All">ALL VIDEOGAMES</option>
            <option value="DB">ONLY DATA BASE GAMES</option>
            <option value="API">ONLY API GAMES</option>
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
            <option value="bestr">WORST RATINGS</option>
            <option value="worstr">BEST RATINGS</option>
          </select>
        </div>
      </div>
      <div>
        {loading == true && (
          <Paging
            gamesPerPage={gamesPerPage}
            allGames={allVideoGames.length}
            paging={paging}
            currentPage={currentPage}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
      </div>
      <div className={s.currenGames}>
        {loading == false ? (
          <Loading />
        ) : (
          currentGames.map((vg) => {
            return (
              <div>
                <Card
                  vg={vg}
                  genreBD={vg.createInDb ? vg.genres : []}
                  genreAPI={!vg.createInDb ? vg.genres : []}
                  key={vg.name}
                  name={vg.name}
                  genre={vg.genres + ""}
                  rating={vg.rating}
                  image={vg.image}
                  id={vg.id}
                  deleteGame={onClickDeleteGame}
                  createInDb={vg.createInDb}
                  addToFavourites={addToFavourites}
                  removesGameToFavourites={removesGameToFavourites}
                />
              </div>
            );
          })
        )}
      </div>
      <div>
        {loading == true && (
          <Paging
            gamesPerPage={gamesPerPage}
            allGames={allVideoGames.length}
            paging={paging}
            currentPage={currentPage}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
      </div>
    </div>
  );
}
