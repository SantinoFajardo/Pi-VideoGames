import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to the videogames PI</h1>
      <Link to="/home">
        <button>Click to enter</button>
      </Link>
    </div>
  );
}
