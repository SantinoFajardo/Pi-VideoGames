import React from "react";
import s from "./videoGameCard.module.css";
import { Link } from "react-router-dom";

export default function Card({ name, image, rating, id, genreBD, genreAPI }) {
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
      <Link to={"/videogames/" + id}>
        <button className={s.currentGames_button}>More</button>
      </Link>
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
