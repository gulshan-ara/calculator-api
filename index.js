const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Hello World");
})

// Simple Calculator API
app.post('/calculate', (req, res) => {
  const { number1, number2, operation } = req.body;
  const num1 = parseInt(number1);
  const num2 = parseInt(number2);

  // Validate input
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'Inputs must be numbers.' });
  }

  if (!['add', 'subtract', 'multiply'].includes(operation)) {
    return res.status(400).json({ error: 'Invalid operation.' });
  }

  // Perform calculation
  let result;
  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    default:
      return res.status(400).json({ error: 'Unexpected error.' });
  }

  // Respond with the result
  res.json({ number1, number2, operation, result });
});

// Start server (not needed for Vercel, but useful for local testing)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
