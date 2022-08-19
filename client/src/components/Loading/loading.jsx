import React from "react";
import s from "./loading.module.css";

export default function Loading() {
  return (
    <div className={s.container}>
      <h3 className={s.Loading}>Loading...</h3>
    </div>
  );
}
