export async function calcInput(req, res) {
  try {
    let result = 0;
    const { num1, num2, operator } = req.body;

    switch (operator) {
      case "+":
        result = Number(num1) + Number(num2);
        break;

      case "-":
        result = Number(num1) - Number(num2);
        break;

      case "*":
        result = Number(num1) * Number(num2);
        break;

      case "/":
        if (Number(num2) === 0) {
          return res.status(400).json({ message: "Cannot divide by 0" });
        }
        result = Number(num1) / Number(num2);
        break;

      case "%":
        result = Number(num1) % Number(num2);
        break;

      default:
        return res.status(400).json({ message: "Invalid operator" });
    }

    res.status(200).json({ result });
  } catch (error) {
    console.error("Calculate controller error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function calcResult(req, res) {
  try {
    res.status(200).send({ message: result });
  } catch (error) {
    console.error("Add controller error,", error);
  }
}
