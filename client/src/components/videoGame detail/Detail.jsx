import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameById } from "../../Actions";
import { Link } from "react-router-dom";
import s from "./Detail.module.css";
import Loading from "../Loading/loading";

export default function Detail(props) {
  // LOCAL STATES/DISPATCH/GLOBAL STATE
  const dispatch = useDispatch();
  const gameDetail = useSelector((state) => state.videoGameDetail);
  const [loading, setLoading] = useState(false);

  //USE EFFECT
  useEffect(async () => {
    await dispatch(getVideogameById(props.match.params.id));
    setLoading(true);
  }, [dispatch, props.match.params.id]);

  return (
    <div className={s.conteiner}>
      {loading == false ? (
        <div className={s.loadingConteiner}>
          <Loading />
        </div>
      ) : (
        <div className={s.conteiner_div}>
          <h1 className={s.name}>{gameDetail.name}</h1>
          <div className={s.conteinerDH}>
            <img
              src={gameDetail.image}
              alt="ImageNotFound"
              className={s.image}
            />
            <div className={s.containerDetail}>
              <h2 className={s.genre}>
                Genres: <br></br>
                {gameDetail.genres}
              </h2>
              <h2 className={s.platforms}>
                Platforms: <br></br>
                {gameDetail.platforms}
              </h2>
              <h3 className={s.released}>Released : {gameDetail.released}</h3>
              <h3 className={s.rating}>Rating: {gameDetail.rating}</h3>
              <p className={s.description}>
                <b>Description:</b> <br></br>
                {gameDetail.description}
              </p>
            </div>
          </div>
          <Link to="/home">
            <button className={s.buttonDetail}>HOME</button>
          </Link>
        </div>
      )}
    </div>
  );
}
