const questionInput = document.getElementById("question");
const askBtn = document.getElementById("askBtn");
const answerDiv = document.getElementById("answer");

askBtn.addEventListener("click", async () => {

    const question = questionInput.value;

    if (!question) {
        answerDiv.innerText = "Ask a question first";
        return;
    }

    try {

        answerDiv.innerText = "Gemini is thinking...";
        askBtn.disabled = true;

        const response = await fetch("http://localhost:5005/api/ask", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })
        });

        const res = await response.json();

        if (res.success) {
            answerDiv.innerText = res.answer;
        } else {
            answerDiv.innerText = res.message;
        }

    } catch (error) {

        console.log(error);
        answerDiv.innerText = "Something went wrong.";

    } finally {

        askBtn.disabled = false;

    }
});