require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// Home Route
app.get("/", (req, res) => {

  res.send("Backend Running Successfully");

});


// Generate Test Cases API
app.post("/generate-testcases", async (req, res) => {

  try {

    const { feature } = req.body;

    const testCases = `
1. Verify successful ${feature} with valid inputs.
2. Verify ${feature} with invalid inputs.
3. Verify empty field validation.
4. Verify special character handling.
5. Verify SQL injection prevention.
6. Verify session timeout behavior.
7. Verify multiple rapid requests.
8. Verify error handling for failed requests.
9. Verify UI responsiveness during ${feature}.
10. Verify secure data transmission.
`;

    res.json({ testCases });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to generate test cases"
    });

  }

});


// Selenium Automation API
app.get("/run-login-test", async (req, res) => {

  try {

    console.log("Automation Started ✅");

    // Clear cache
    delete require.cache[
      require.resolve("./tests/loginTest")
    ];

    // Import automation function
    const runLoginTest = require("./tests/loginTest");

    // Run Selenium Automation
    runLoginTest();

    // Send response immediately
    res.json({
      message: "Login Automation Started ✅"
    });

  } catch (error) {

    console.log("Automation Error ❌");

    console.log(error);

    res.status(500).json({
      error: "Failed to run automation test"
    });

  }

});


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});