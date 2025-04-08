const fetch = require("node-fetch-commonjs");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function extractMainTextFromURL(url) {
    const res = await fetch(url);
    const html = await res.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const elements = doc.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li, blockquote");
    let textContent = "";

    elements.forEach(el => {
        textContent += el.textContent.trim() + "\n";
    });

    return textContent.trim();
}


class Conversation {
    constructor(note) {
        this.chat = model.startChat({
            systemInstruction: {
                role: "system", parts: [{
                    text: `
            Sample default text.
        ` }]
            }
        });
    }
    async getResponse(link) {
        const content = await extractMainTextFromURL(link);
        return await this.#response(`Some instruction to AI. ${content}`);
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

module.exports = Conversation;
