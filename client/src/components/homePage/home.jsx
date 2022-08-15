import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames } from "../../Actions";
import { Link } from "react-router-dom";
import Card from "../videoGame Card/videoGameCard";

export default function Home() {
  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.videoGames);
  const allGenres = useSelector((state) => state.genres);

  useEffect(() => {
    //Esta accion se va a ejecutar cada vez que renderizemos la pagina
    dispatch(getVideogames());
  }, [dispatch]);

  let handleClick = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
  };

  return (
    <div>
      <h1>PI-SANTINO FAJARDO</h1>
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
      <div>
        <select name="" id="">
          {allGenres.sort().map((e) => {
            return <option value={e}>{e.name}</option>;
          })}
        </select>
      </div>
      <div>
        <select name="" id="">
          <option value="asc">Ascendent</option>
          <option value="des">Descendent</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div>
        <select name="" id="">
          <option value="All">All Videogames</option>
          <option value="DB">Only data base games</option>
          <option value="API">Only api games</option>
        </select>
      </div>
      <div>
        {allVideoGames &&
          allVideoGames.map((vg) => {
            return (
              <Card
                key={vg.id}
                name={vg.name}
                genre={vg.genre}
                rating={vg.rating}
                image={vg.image}
              />
            );
          })}
      </div>
    </div>
  );
}
