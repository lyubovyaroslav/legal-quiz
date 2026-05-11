import React, { useState } from "react";
import jsPDF from "jspdf";

export default function App() {
  const questionBank = [
    {
      category: "Права человека",
      question: "Имеет ли гражданин право на образование?",
      options: ["Да", "Нет", "Только после 18 лет"],
      answer: 0,
      explanation:
        "Право на образование закреплено Конституцией РФ."
    },

    {
      category: "Интернет и закон",
      question: "Можно ли передавать пароль друзьям?",
      options: ["Да", "Нет"],
      answer: 1,
      explanation:
        "Пароль нельзя сообщать другим людям."
    },

    {
      category: "Финансы",
      question: "Можно ли вернуть некачественный товар?",
      options: ["Да", "Нет"],
      answer: 0,
      explanation:
        "Закон о защите прав потребителей разрешает возврат."
    },

    {
      category: "Ответственность",
      question:
        "С какого возраста наступает уголовная ответственность?",
      options: ["14 лет", "16 лет", "18 лет"],
      answer: 1,
      explanation:
        "По общему правилу уголовная ответственность наступает с 16 лет."
    }
  ];

  const questions = Array.from(
    { length: 100 },
    (_, i) => ({
      ...questionBank[i % questionBank.length]
    })
  );

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] =
    useState<number | null>(null);

  const [finished, setFinished] =
    useState(false);

  const currentQuestion = questions[current];

  const handleAnswer = (index: number) => {
    if (selected !== null) return;

    setSelected(index);

    if (index === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const generateCertificate = () => {
    const doc = new jsPDF();

    doc.setFontSize(28);

    doc.text(
      "ДИПЛОМ",
      105,
      40,
      {
        align: "center"
      }
    );

    doc.setFontSize(16);

    doc.text(
      "За успешное прохождение викторины",
      105,
      70,
      {
        align: "center"
      }
    );

    doc.text(
      "ПравоPRO",
      105,
      90,
      {
        align: "center"
      }
    );

    doc.text(
      "Результат: " + score + " из " + questions.length,
      105,
      120,
      {
        align: "center"
      }
    );

    doc.save("diplom.pdf");
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-xl w-full">

          <h1 className="text-4xl font-bold mb-6 text-green-700">
            Викторина завершена
          </h1>

          <p className="text-2xl mb-8">
            Ваш результат:
            {" "}
            <span className="font-bold">
              {score} / {questions.length}
            </span>
          </p>

          <button
            onClick={generateCertificate}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold"
          >
            Скачать диплом PDF
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full">

        <div className="mb-6">

          <h1 className="text-4xl font-bold text-blue-700 mb-2">
            ПравоPRO
          </h1>

          <p className="text-gray-600">
            Вопрос {current + 1} из {questions.length}
          </p>

        </div>

        <div className="mb-8">

          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-semibold">
            {currentQuestion.category}
          </div>

          <h2 className="text-2xl font-bold mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">

            {currentQuestion.options.map(
              (option, index) => {

                let styles =
                  "border border-slate-300 hover:border-blue-500";

                if (selected !== null) {

                  if (
                    index === currentQuestion.answer
                  ) {
                    styles =
                      "bg-green-100 border-green-500";
                  }

                  else if (
                    index === selected
                  ) {
                    styles =
                      "bg-red-100 border-red-500";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() =>
                      handleAnswer(index)
                    }
                    className={`w-full text-left p-4 rounded-2xl transition font-semibold ${styles}`}
                  >
                    {option}
                  </button>
                );
              }
            )}

          </div>

        </div>

        {selected !== null && (

          <div className="bg-slate-100 rounded-2xl p-4 mb-6">

            <h3 className="font-bold mb-2">
              Объяснение
            </h3>

            <p>
              {currentQuestion.explanation}
            </p>

          </div>

        )}

        <button
          onClick={nextQuestion}
          disabled={selected === null}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-2xl font-bold"
        >
          {current + 1 === questions.length
            ? "Завершить"
            : "Следующий вопрос"}
        </button>

      </div>

    </div>
  );
}