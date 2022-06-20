import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Superheroes from "./routes/Superheroes"
import SuperheroDetails from "./routes/SuperheroDetails"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Superheroes />} />
      <Route path="/superhero/:id" element={<SuperheroDetails />} />
      <Route path="*" element={<h1>Page not found 404 error</h1>} />
    </Routes>
  );
}

export default App;
