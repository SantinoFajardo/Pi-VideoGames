import React from "react";
import s from "./loading.module.css";

export default function Loading() {
  return (
    <div className={s.container}>
      <div className={s.carga}></div>
      <h1 className={s.loadingTitle}>Loading...</h1>
    </div>
  );
}
