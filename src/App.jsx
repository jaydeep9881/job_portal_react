import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homes from "./assets/Homes";       // check this path!
import CreateJob from "./assets/CreateJob";
import Nav from "./assets/Nav";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/add-job" element={<CreateJob />} />
      </Routes>
    </Router>
  );
}

export default App;
1