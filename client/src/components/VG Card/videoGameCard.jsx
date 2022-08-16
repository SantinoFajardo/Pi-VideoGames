import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, genre, image, rating, id }) {
  return (
    <div id={id}>
      <Link to="/videogame/:id">
        <h3>{name}</h3>
      </Link>
      <h4>{genre}</h4>
      <h5>{rating}</h5>
      <img src={image} alt={`${name}`} width="100px" height="100px" />
    </div>
  );
}
