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
  } else if (!input.image || input.image.length > 255) {
    errors.image = "The url of image is require and its length less than 255";
  } else if (input.genres.length == 0) {
    errors.genres = "The game requires at least one genre";
  } else if (input.platforms.length == 0) {
    errors.platforms = "The game requires at least one platform";
  }
  return errors;
}
export default function Create() {
  // DISPATCHS/STATES/HISTORY
  const dispatch = useDispatch();
  const history = useHistory();
  const allgenres = useSelector((state) => state.genres);
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
    image: "",
    genres: [],
    platforms: [],
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
    if (
      input.name ||
      input.description ||
      input.rating ||
      input.image ||
      input.platforms.length ||
      input.genres.length
    ) {
      dispatch(postVideoGame(input));
      alert(`The game "${input.name}" has been created successfully `);
      setInput({
        name: "",
        description: "",
        released: "",
        rating: "",
        image: "",
        platforms: [],
        genres: [],
      });
      history.push("/home");
    } else {
      alert(`Some important data is missing`);
    }
  };

  const deleteGenre = (name) => {
    let genresFilter = input.genres.filter((g) => g != name);
    setInput({
      ...input,
      genres: genresFilter,
    });
  };

  const deletePlatforms = (name) => {
    let platformFilter = input.platforms.filter((p) => p != name);
    setInput({
      ...input,
      platforms: platformFilter,
    });
  };

  return (
    <div className={s.conteiner}>
      <div>
        <h1 className={s.title}>Add a videogame in the app</h1>
        <Link to="/home">
          <button className={s.home}>Come back home</button>
        </Link>
      </div>
      <div className={s.divForm}>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div className={s.name}>
              <label>Name</label>
              <input
                className={s.formInputs}
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p className={s.error}>{errors.name}</p>}
            </div>
            <div className={s.released}>
              <label>Released</label>
              <input
                className={s.formInputs}
                type="date"
                name="released"
                value={input.released}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label>Rating</label>
              <input
                className={s.formInputs}
                type="number"
                name="rating"
                value={input.rating}
                onChange={(e) => handleChange(e)}
              />
              {errors.rating && <p className={s.error}>{errors.rating}</p>}
            </div>
          </div>
          <div className={s.description}>
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
            <label>Image</label>
            <input
              className={s.formInputs}
              type="text"
              name="image"
              value={input.image}
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p className={s.error}>{errors.image}</p>}
          </div>
          <label className={s.genreLabel}>Genres: </label>
          <div className={s.genres}>
            {allgenres.map((genre) => {
              return (
                <section key={genre.name}>
                  <input
                    className={s.inputG}
                    type="checkbox"
                    name={genre.name}
                    value={genre.name}
                    onChange={(e) => handleCheckGenre(e)}
                  />
                  <label className={s.labelG}>{genre.name}</label>
                  {input.genres.includes(genre.name) ? (
                    <button
                      className={s.platform_genre_button}
                      onClick={() => deleteGenre(genre.name)}
                    >
                      X
                    </button>
                  ) : null}
                </section>
              );
            })}
          </div>
          {input.genres.length == 0 && (
            <p className={s.error}>{errors.genres}</p>
          )}
          <label className={s.platformLabel}>Platforms: </label>
          <div className={s.platforms}>
            {platforms.map((platform) => {
              return (
                <section key={platform}>
                  <input
                    className={s.inputP}
                    type="checkbox"
                    name={platform}
                    value={platform}
                    onChange={(e) => handleCheckPlatform(e)}
                  />
                  <label className={s.labelP}>{platform}</label>
                  {input.platforms.includes(platform) ? (
                    <button
                      className={s.platform_genre_button}
                      onClick={() => deletePlatforms(platform)}
                    >
                      X
                    </button>
                  ) : null}
                </section>
              );
            })}
            {!input.platforms.length && (
              <p className={s.error}>{errors.platforms}</p>
            )}
          </div>
          <button className={s.submit} type="submit">
            Created
          </button>
        </form>
      </div>
    </div>
  );
}
