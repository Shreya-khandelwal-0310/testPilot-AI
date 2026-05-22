const OpenAI = require("openai").default;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateTestCases(feature) {

  try {

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",

      messages: [
        {
          role: "user",
          content: `Generate ONLY 5 short software testing test cases for ${feature}`
        }
      ],

      max_tokens: 100

    });

    return response.choices[0].message.content;

  } catch (error) {

    console.log(error);

    return error.message;

  }

}

module.exports = generateTestCases;