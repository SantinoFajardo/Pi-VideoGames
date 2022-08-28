import React from "react";
import s from "./videoGameCard.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeGameToFavourites } from "../../Actions";

export default function Card({
  name,
  image,
  rating,
  id,
  genreBD,
  genreAPI,
  createInDb,
  deleteGame,
  addToFavourites,
  removesGameToFavourites,
}) {
  const dispatch = useDispatch();

  // FUNCIONES
  function removesGameToFavourites(name) {
    dispatch(removeGameToFavourites(name));
  }

  // SEARCH VG IN FAVOURITES STATE
  const favouritesGames = useSelector((state) => state.favouritesGames);
  let currentGame = favouritesGames.find((vg) => vg.name == name);
  return (
    <div id={id} key={id} className={s.container}>
      <h3 className={s.title}>Name: {name}</h3>
      <h4 className={s.genre}>
        Genres:{"  "}
        {genreAPI.length > 0
          ? genreAPI.map((genre) => genre + " ")
          : genreBD.map((genre) => genre.name + " ")}
      </h4>

      <h5 className={s.rating}>Rating: {rating}</h5>
      <div>
        <Link to={"/videogames/" + id}>
          <button className={s.currentGames_button}>More</button>
        </Link>
        {createInDb && (
          <button
            onClick={() => deleteGame(name, id)}
            className={s.currentGames_delete}
          >
            Delete
          </button>
        )}
        {!currentGame ? (
          <button
            className={s.addFavourites}
            onClick={() => addToFavourites(name)}
          >
            Favourite
          </button>
        ) : (
          <button
            className={s.addFavourites}
            onClick={() => removesGameToFavourites(name)}
          >
            Remove
          </button>
        )}
      </div>
      <img
        src={image}
        alt={`${name}`}
        width="300px"
        height="250px"
        className={s.image}
      />
    </div>
  );
}
