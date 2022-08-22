import React from "react";
import s from "./Favourites.module.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../VG Card/videoGameCard";
import { Link } from "react-router-dom";
import { removeGameToFavourites } from "../../Actions";

export default function Favourites({
  addToFavourites,
  removesGameToFavourites,
}) {
  const favouritesGames = useSelector((state) => state.favouritesGames);

  return (
    <div>
      <h1 className={s.title}>Favourites Games</h1>
      <Link to="/home">
        <button className={s.buttonHome}>Home</button>
      </Link>
      <div className={s.currentGames}>
        {favouritesGames &&
          favouritesGames.map((vg) => {
            return (
              <div key={vg.id}>
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
                  addToFavourites={addToFavourites}
                  removesGameToFavourites={removesGameToFavourites}
                  createInDb={vg.createInDb}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
