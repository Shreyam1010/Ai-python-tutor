import { useState, useEffect } from "react";

const QuizSection = () => {
  const allQuestions = [
    {
      question: "What does the 'def' keyword do in Python?",
      options: ["Defines a function", "Declares a variable", "Creates a loop", "Imports a module"],
      correct: "Defines a function",
      tutorialLink: "https://www.youtube.com/watch?v=rfscVS0vtbw", 
    },
    {
      question: "Which function is used to take user input in Python?",
      options: ["input()", "get()", "scan()", "read()"],
      correct: "input()",
      tutorialLink: "https://realpython.com/python-input-output/", 
    },
    {
      question: "What is the output of `print(2 ** 3)`?",
      options: ["5", "6", "8", "9"],
      correct: "8",
      tutorialLink: "https://www.youtube.com/watch?v=rfscVS0vtbw",  
    },
    {
      question: "Which of the following is a mutable data type in Python?",
      options: ["Tuple", "String", "List", "Set"],
      correct: "List",
      tutorialLink: "https://realpython.com/python-data-types/", 
    },
    {
      question: "How do you start a comment in Python?",
      options: ["//", "/*", "--", "#"],
      correct: "#",
      tutorialLink: "https://realpython.com/ref/glossary/comment/", 
    },
    {
      question: "Which keyword is used to exit a loop in Python?",
      options: ["stop", "break", "exit", "return"],
      correct: "break",
      tutorialLink: "https://www.youtube.com/watch?v=rfscVS0vtbw", 
    },
    {
      question: "What will `type(10)` return in Python?",
      options: ["str", "int", "float", "boolean"],
      correct: "int",
      tutorialLink: "https://realpython.com/lessons/data-types/", 
    },
    {
      question: "Which function is used to find the length of a string in Python?",
      options: ["size()", "count()", "length()", "len()"],
      correct: "len()",
      tutorialLink: "https://www.youtube.com/watch?v=rfscVS0vtbw", 
    },
    {
      question: "What is the default return value of a function that doesn’t return anything?",
      options: ["None", "0", "Empty String", "False"],
      correct: "None",
      tutorialLink: "https://realpython.com/ref/glossary/function/", 
    },
    {
      question: "Which operator is used for exponentiation in Python?",
      options: ["^", "**", "^^", "//"],
      correct: "**",
      tutorialLink: "https://realpython.com/python-operators-expressions/", 
    },
    {
      question: "Which module is used for working with random numbers?",
      options: ["random", "math", "numpy", "rand"],
      correct: "random",
      tutorialLink: "https://www.youtube.com/watch?v=rfscVS0vtbw", 
    },
    {
      question: "What is the correct syntax to open a file named 'data.txt' in read mode?",
      options: ["open('data.txt')", "open('data.txt', 'r')", "file('data.txt')", "read('data.txt')"],
      correct: "open('data.txt', 'r')",
      tutorialLink: "https://realpython.com/learning-paths/files-and-file-streams-in-python/", 
    },
  ];

  const getRandomQuestions = () => {
    let shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  };

  const [questions, setQuestions] = useState(getRandomQuestions());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    setQuestions(getRandomQuestions());
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleShowAnswers = () => {
    const incorrectAnswers = questions.filter(
      (q, index) => selectedAnswers[index] !== q.correct
    );
    setWrongAnswers(incorrectAnswers);
    setScore(
      questions.reduce(
        (score, q, index) => (selectedAnswers[index] === q.correct ? score + 1 : score),
        0
      )
    );
    setIsQuizFinished(true);
    setShowAllAnswers(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4 text-center">Python Quiz 🐍</h2>

      {!showAllAnswers ? (
        <>
          <p className="text-lg font-medium">{questions[currentQuestion].question}</p>
          <div className="mt-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-2 my-1 rounded-lg border ${
                  selectedAnswers[currentQuestion] === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={handleShowAnswers}
              >
                Submit & View Score
              </button>
            )}
          </div>
        </>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-2">Quiz Results</h3>
          <p className="font-medium mb-4">Congratulations! You scored {score} out of 10.</p>
          {questions.map((q, index) => (
            <div key={index} className="mb-3 p-2 border rounded">
              <p className="font-medium">{index + 1}. {q.question}</p>
              <p>
                <span className="font-semibold">Your Answer:</span>{" "}
                <span
                  className={`${
                    selectedAnswers[index] === q.correct ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {selectedAnswers[index] || "Not Answered"}
                </span>
              </p>
              <p>
                <span className="font-semibold">Correct Answer:</span> <span className="text-green-600">{q.correct}</span>
              </p>
              {selectedAnswers[index] !== q.correct && (
                <p className="text-yellow-600">
                  <a href={q.tutorialLink} target="_blank" className="text-blue-600">
                    Learn more about this topic
                  </a>
                </p>
              )}
            </div>
          ))}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
            onClick={() => {
              setShowAllAnswers(false);
              setCurrentQuestion(0);
              setSelectedAnswers({});
              setScore(null);
              setIsQuizFinished(false);
              setQuestions(getRandomQuestions());
            }}
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizSection;
