import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameById } from "../../Actions";

export default function Detail(props) {
  const dispatch = useDispatch();
  const gameDetail = useSelector((state) => state.videoGameDetail);

  useEffect(() => {
    dispatch(getVideogameById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div>
      {gameDetail && (
        <div>
          <h1>{gameDetail.name}</h1>
          <img src={gameDetail.image} alt="ImageNotFound" />
          <h2>Genres: {gameDetail.genres}</h2>
          <h2>Platforms: {gameDetail.platforms}</h2>
          <h3>Released : {gameDetail.released}</h3>
          <h3>Rating: {gameDetail.rating}</h3>
          <p>Description: {gameDetail.description}</p>
        </div>
      )}
    </div>
  );
}
