import React, { useState } from "react";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();
  const [numJson, setNum] = useState({
    num1: "",
    num2: "",
    operator: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setNum((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(numJson),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate");
      }

      const data = await response.json();

      // redirect and send result
      navigate("/result", { state: { result: data.result } });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  return (
    <div>
      <h1 className="text-red-500 w-3xl m-5">Home Page</h1>
      <form className="m-5" onSubmit={handleSubmit} action="/" method="post">
        <label>Enter 1st number:</label>
        <br />
        <input
          onChange={handleChange}
          name="num1"
          type="number"
          placeholder="type here..."
          value={numJson.num1}
        />
        <br />
        <br />
        <label>Enter 2nd number:</label>
        <br />
        <input
          onChange={handleChange}
          name="num2"
          type="number"
          placeholder="type here..."
          value={numJson.num2}
        />
        <br />
        <br />
        <label>Select an operator:</label>
        <br />
        <input
          type="radio"
          id="add"
          name="operator"
          checked={numJson.operator === "+"}
          onChange={handleChange}
          value="+"
        />
        <label htmlFor="add"> Add (+)</label>
        <br />
        <input
          type="radio"
          id="subtract"
          name="operator"
          checked={numJson.operator === "-"}
          onChange={handleChange}
          value="-"
        />
        <label htmlFor="subtract"> Subtract (-)</label>
        <br />
        <input
          type="radio"
          id="multiply"
          name="operator"
          checked={numJson.operator === "*"}
          onChange={handleChange}
          value="*"
        />
        <label htmlFor="multply"> Multiply (*)</label>
        <br />
        <input
          type="radio"
          id="divide"
          name="operator"
          checked={numJson.operator === "/"}
          onChange={handleChange}
          value="/"
        />
        <label htmlFor="divide"> Divide (/)</label>
        <br />
        <input
          type="radio"
          id="modulus"
          name="operator"
          checked={numJson.operator === "%"}
          onChange={handleChange}
          value="%"
        />
        <label htmlFor="modulus"> Modulus (%)</label>
        <br />
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default HomePage;
