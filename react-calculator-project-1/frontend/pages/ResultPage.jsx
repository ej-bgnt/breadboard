import React from "react";
import { useLocation } from "react-router";

function ResultPage() {
  const location = useLocation();
  const result = location.state?.result;

  return (
    <div>
      <h1 className="text-red-500 w-3xl">Result Page</h1>
      <h2>Result: {result}</h2>
    </div>
  );
}

export default ResultPage;
