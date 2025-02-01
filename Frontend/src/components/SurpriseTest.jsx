import { useState } from "react";

const questions = [
  { question: "What is the output of `print(3 + 2 * 2)`?", answer: "7" },
  { question: "Which keyword is used to define a function in Python?", answer: "def" },
  { question: "What does `len()` function do?", answer: "Returns the length of an object" },
  { question: "What is the purpose of `if __name__ == '__main__':` in Python?", answer: "To execute code only if the file is run directly" },
];

export default function SurpriseTest() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setUserAnswer("");
    setResult(null);
  };

  const checkAnswer = () => {
    if (userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setResult("Correct! 🎉");
    } else {
      setResult(`Wrong! The correct answer is: ${currentQuestion.answer}`);
    }
  };

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Surprise Test</h2>
      <button onClick={generateQuestion} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Get a Random Question
      </button>
      {currentQuestion && (
        <div className="mt-4">
          <p className="text-lg font-medium">{currentQuestion.question}</p>
          <input
            type="text"
            placeholder="Your answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="border p-2 mt-2 w-full"
          />
          <button onClick={checkAnswer} className="bg-green-500 text-white px-4 py-2 rounded-md mt-2">
            Submit
          </button>
          {result && <p className="mt-2 text-lg">{result}</p>}
        </div>
      )}
    </div>
  );
}
