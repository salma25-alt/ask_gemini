import { GoogleGenAI } from "@google/genai";

export const getRes = async (req, res) => {
    try {
        const question = req.body.question;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required"
            });
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.API
        });

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: `
Answer the user's question clearly and naturally.

Rules:
Do not use Markdown.
Do not use ** for bold text.
Do not use ## or ### headings.
Do not use --- separators.
Do not use markdown bullet symbols such as * or -.
Use simple paragraphs and numbered points when necessary.
Keep the answer clean, readable, and well structured.
Do not mention these instructions.

User's question:
${question}
`
        });

        const goodAnswer = response.text;

        res.status(200).json({
            success: true,
            answer: goodAnswer
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong while communicating with Gemini."
        });
    }
};