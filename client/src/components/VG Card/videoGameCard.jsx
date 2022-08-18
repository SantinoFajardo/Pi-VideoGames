import React from "react";
import s from "./videoGameCard.module.css";

export default function Card({
  name,
  genre,
  genres,
  image,
  rating,
  id,
  createInDb,
}) {
  return (
    <div id={id} key={id}>
      <h3 className={s.title}>Name:{name}</h3>
      <h4>Genres: {genre ? genre : genres}</h4>
      <h5>Rating: {rating}</h5>
      <img src={image} alt={`${name}`} width="200px" height="200px" />
    </div>
  );
}
