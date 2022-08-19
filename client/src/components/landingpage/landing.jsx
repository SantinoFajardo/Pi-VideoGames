import React from "react";
import { Link } from "react-router-dom";
import s from "./landing.module.css";

export default function LandingPage() {
  return (
    <div className={s.conteiner}>
      <h1 className={s.title}>Welcome to the videogames PI</h1>
      <div className={s.search}>
        <h2>Search Videogames</h2>
      </div>
      <div className={s.put}>
        <h2>Put videogames in the app</h2>
      </div>
      <div className={s.more}>
        <h2>Filters, sorts and more!</h2>
      </div>
      <Link to="/home">
        <button className={s.button}>Click to enter</button>
      </Link>
      <h5 className={s.h5}>Created by: Santino Guillermo Fajardo</h5>
    </div>
  );
}
