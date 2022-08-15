import React from "react";

export default function Card({ name, genre, image, rating }) {
  return (
    <div>
      <h3>{name}</h3>
      <h4>{genre}</h4>
      <h5>{rating}</h5>
      <img src={image} alt={`Image for ${name}`} />
    </div>
  );
}
