import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, genre, image, rating, id }) {
  return (
    <div id={id} key={id}>
      <h3>Name:{name}</h3>
      <h4>Genres: {genre}</h4>
      <h5>Rating: {rating}</h5>
      <img src={image} alt={`${name}`} width="200px" height="200px" />
      <Link to={"/videogame/" + id}>
        <button>More</button>
      </Link>
    </div>
  );
}
