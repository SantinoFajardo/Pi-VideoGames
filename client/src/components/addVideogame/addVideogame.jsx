import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideoGame } from "../../Actions";
import { getGenres } from "../../Actions";
import { getPlatforms } from "../../Actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./addVideogame.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) errors.name = "The name is required for created a videogame";
  else if (!input.description)
    errors.description = "The description is requiere";
  else if (!input.rating || input.rating > 5 || input.rating < 0) {
    errors.rating = "Rating must be a number between 0-5";
  } else if (!input.platforms.length) {
    errors.platforms = "The game requires at least one platform";
  } else if (!input.image || input.image.length > 255) {
    errors.image = "The url of image is require and its length less than 255";
  } else if (!input.genres.length) {
    errors.genres = "The game requires at least one genre";
  }
  return errors;
}
export default function Create() {
  // DISPATCHS/STATES/HISTORY
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  // USEEFFECT
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  // LOCAL STATES
  // STATE INPUT
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    image: "",
    genres: [],
  });
  // STATE ERRORS
  const [errors, setErrors] = useState({});

  // FUNCTIONS
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  };

  const handleCheckPlatform = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
    console.log(input);
  };

  const handleCheckGenre = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
    console.log(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postVideoGame(input));
    alert(`The game ${input.name} has been created successfully `);
    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      platforms: [],
      image: "",
      genres: [],
    });
    history.push("/home");
  };

  return (
    <div>
      <div>
        <h1>Add a videogame in the app</h1>
        <Link to="/home">
          <button>Come back home</button>
        </Link>
      </div>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className={s.error}>{errors.name}</p>}
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            id=""
            cols="30"
            rows="10"
            value={input.description}
            onChange={(e) => handleChange(e)}
          ></textarea>
          {errors.description && (
            <p className={s.error}>{errors.description}</p>
          )}
        </div>
        <div>
          <label>Released</label>
          <input
            type="date"
            name="released"
            value={input.released}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            value={input.rating}
            onChange={(e) => handleChange(e)}
          />
          {errors.rating && <p className={s.error}>{errors.rating}</p>}
        </div>
        <div>
          <label>Platforms: </label>
          {platforms.map((platform) => {
            return (
              <div key={platform}>
                <input
                  type="checkbox"
                  name={platform}
                  value={platform}
                  onChange={(e) => handleCheckPlatform(e)}
                />
                <label>{platform}</label>
              </div>
            );
          })}
        </div>
        <div>
          <label>Image</label>
          <input
            type="text"
            name="image"
            value={input.image}
            onChange={(e) => handleChange(e)}
          />
          {errors.image && <p className={s.error}>{errors.image}</p>}
        </div>
        <div>
          <label>Genres: </label>
          {genres.map((genre) => {
            return (
              <div key={genre.name}>
                <input
                  type="checkbox"
                  name={genre.name}
                  value={genre.name}
                  onChange={(e) => handleCheckGenre(e)}
                />
                <label>{genre.name}</label>
              </div>
            );
          })}
        </div>
        <button type="submit">Created</button>
      </form>
    </div>
  );
}
