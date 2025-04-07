const fetch = require("node-fetch-commonjs");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class Conversation {
    constructor(note) {
        this.chat = model.startChat({ systemInstruction: { role: "system", parts: [{ text: `
            Sample default text.
        ` }] } });
    }
    async getReponse(link) {
        return await this.#response(`Some instruction to AI. ${link}`);
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
