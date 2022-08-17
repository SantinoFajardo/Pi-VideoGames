import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, genre, image, rating, id }) {
  return (
    <div id={id}>
      <h3>
        Name:
        <Link to="/videogame/:id">{name}</Link>
      </h3>
      <h4>Genres: {genre}</h4>
      <h5>Rating: {rating}</h5>
      <img src={image} alt={`${name}`} width="100px" height="100px" />
    </div>
  );
}
