import { useState } from "react";
import "./App.css";

const questionBank = [
  {
    category: "Конституция",
    question: "Какой документ является основным законом РФ?",
    options: ["Конституция РФ", "Трудовой кодекс", "Уголовный кодекс"],
    answer: 0,
  },

  {
    category: "Права человека",
    question: "Имеет ли гражданин право на свободу слова?",
    options: ["Да", "Нет", "Только после 18 лет"],
    answer: 0,
  },

  {
    category: "Интернет",
    question: "Можно ли публиковать чужие фото без разрешения?",
    options: ["Нет", "Да", "Иногда"],
    answer: 0,
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === questionBank[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questionBank.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="app">
        <h1>Викторина завершена 🎉</h1>
        <h2>
          Результат: {score} из {questionBank.length}
        </h2>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>ПравоPRO</h1>

      <div className="quiz-card">
        <h3>{questionBank[currentQuestion].category}</h3>

        <h2>{questionBank[currentQuestion].question}</h2>

        <div className="answers">
          {questionBank[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(index)}>
              {option}
            </button>
          ))}
        </div>

        <p>
          Вопрос {currentQuestion + 1} из {questionBank.length}
        </p>
      </div>
    </div>
  );
}

export default App;