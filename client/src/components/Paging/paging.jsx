import React from "react";
import s from "./paging.module.css";

export default function Paging({
  gamesPerPage,
  allGames,
  paging,
  handleNext,
  handlePrev,
  currentPage,
}) {
  const pageNumbers = [];

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
              <button
                id={currentPage == n ? s.actualPage : null}
                onClick={() => paging(n)}
                className={s.button}
              >
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
