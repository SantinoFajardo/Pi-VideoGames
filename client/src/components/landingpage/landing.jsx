import React from "react";
import { Link } from "react-router-dom";
import s from "./landing.module.css";

export default function LandingPage() {
  return (
    <div className={s.conteiner}>
      <h1 className={s.h1}>Welcome to the videogames PI</h1>
      <Link to="/home">
        <button className={s.button}>Click to enter</button>
      </Link>
      <h5 className={s.h5}>Created by: Santino Guillermo Fajardo</h5>
    </div>
  );
}
