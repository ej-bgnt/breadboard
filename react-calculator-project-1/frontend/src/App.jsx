import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "../pages/HomePage";
import ResultPage from "../pages/ResultPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
