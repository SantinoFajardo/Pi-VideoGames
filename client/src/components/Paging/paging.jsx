import React from "react";

export default function Paging({ gamesPerPage, allGames, paging }) {
  const pageNumbers = [];

  // Recorre el array de numeros que son la cantidad de games por los games por pagina(100/15=6.66/(7))
  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <ul>
          {pageNumbers &&
            pageNumbers.map((n) => (
              <li key={n}>
                <button onClick={() => paging(n)}>{n}</button>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
