const fetch = require("node-fetch-commonjs");
const cheerio = require("cheerio");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function extractMainTextFromURL(url) {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  let textContent = "";

  $("p, h1, h2, h3, h4, h5, h6, li, blockquote").each((_, el) => {
    const text = $(el).text().trim();
    if (text) {
      textContent += text + "\n";
    }
  });

  return textContent.trim();
}

class Conversation {
    constructor(note) {
        this.chat = model.startChat({
            systemInstruction: {
                role: "system", parts: [{
                    text: `An app called "In the Node" allows a user to enter a link to a learning resource, and the app will create a tree of prerequisite knowledge required, with the lowest children nodes being what the user already knows about. The graph is incomplete so far. Given the link text content of a node from the user, find a list of prerequisites on the internet, and respond in the following format, one node per line:
Title; Description; link
Example:
Deutsch–Jozsa algorithm; A deterministic quantum algorithm that is one of the first examples of a quantum algorithm that is exponentially faster than any possible deterministic classical algorithm.; https://en.wikipedia.org/wiki/Deutsch%E2%80%93Jozsa_algorithm
Each of the prerequisites must be strictly simpler than the given node. Provide the best sources for each topic, and don't allow any duplicates of any topic. Don't necessarily stick to one website. Avoid forums, and stick to sources that only give educational content.` }]
            }
        });
    }
    async getResponse(link) {
        const content = await extractMainTextFromURL(link);
        return await this.#response(`Link:\n${link}\nContent:\n${content}`);
    }
    async #response(prompt) {
        try {
            const result = await this.chat.sendMessage(prompt)
            return result.response.text();
        } catch (error) {
            return error;
        }
    }
}

async function getResponse(link) {
    return await new Conversation().getResponse(link);
}

module.exports = getResponse;
