import React from "react";
import s from "./paging.module.css";

export default function Paging({
  gamesPerPage,
  allGames,
  paging,
  handleNext,
  handlePrev,
}) {
  const pageNumbers = [];

  // Recorre el array de numeros que son la cantidad de games por los games por pagina(100/15=6.66/(7))
  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={s.conteiner}>
      <ul className={s.ul}>
        <button className={s.prev} onClick={handlePrev}>
          {"<<"}
        </button>
        {pageNumbers &&
          pageNumbers.map((n) => (
            <li key={n} className={s.li}>
              <button onClick={() => paging(n)} className={s.button}>
                {n}
              </button>
            </li>
          ))}
        <button className={s.next} onClick={handleNext}>
          {">>"}
        </button>
      </ul>
    </div>
  );
}
