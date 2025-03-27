import React, { useState } from "react";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Theme.css";
import "../style/Learn.css";

const Learn = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(null);
  const [answers, setAnswers] = useState({});
  
  const resources = [
    { title: "Investing Basics - Investopedia", link: "https://www.investopedia.com/investing-4427775" },
    { title: "Stock Market Crash Course - YouTube", link: "https://www.youtube.com/watch?v=Xn7KWR9EOGQ&list=PLo-MT8s_W2ZGgAQof1HDwwUZKoQTgqyiT" },
    { title: "Beginner's Guide to Stocks", link: "https://www.stockmarketguides.com/beginner-guide" },
    { title: "Understanding Market Trends", link: "https://marketanalysis.com/" }
  ];

  const questions = [
    { id: 1, question: "What is a stock?", options: ["A loan to a company", "A share in a company", "A type of bond"], correct: "A share in a company" },
    { id: 2, question: "What does IPO stand for?", options: ["Initial Public Offering", "International Portfolio Option", "Investment Private Organization"], correct: "Initial Public Offering" },
    { id: 3, question: "Which market index tracks the top 30 companies in India?", options: ["NIFTY 50", "BSE Sensex", "Dow Jones"], correct: "BSE Sensex" },
    { id: 4, question: "Which is NOT a type of financial market?", options: ["Stock Market", "Commodity Market", "Automobile Market"], correct: "Automobile Market" },
    { id: 5, question: "What is the purpose of a mutual fund?", options: ["To invest in multiple assets", "To trade cryptocurrencies", "To give loans"], correct: "To invest in multiple assets" },
    { id: 6, question: "Who regulates the stock market in India?", options: ["RBI", "SEBI", "IMF"], correct: "SEBI" },
    { id: 7, question: "What does P/E ratio stand for?", options: ["Profit/Earnings", "Price/Earnings", "Portfolio/Equity"], correct: "Price/Earnings" },
    { id: 8, question: "Which factor affects stock prices the most?", options: ["Weather", "Company Performance", "Population Growth"], correct: "Company Performance" },
    { id: 9, question: "What is a dividend?", options: ["A company's profit shared with shareholders", "A type of tax", "A government fund"], correct: "A company's profit shared with shareholders" },
    { id: 10, question: "What does a bullish market indicate?", options: ["Prices are rising", "Prices are falling", "Market is unstable"], correct: "Prices are rising" }
  ];

  const handleAnswerChange = (id, answer) => {
    setAnswers({ ...answers, [id]: answer });
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) correctAnswers++;
    });
    setScore(correctAnswers);
    toast.success(`Quiz submitted! You scored ${correctAnswers} out of ${questions.length}.`);
  };

  return (
    <div className="learn-page">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />
      <div className="container">
        <h1 className="page-title">Stock Market Learning Hub</h1>
        <p className="subtitle">Enhance your stock market knowledge with these resources:</p>

        <div className="resources-section">
          {resources.map((res, index) => (
            <a 
              key={index} 
              href={res.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="resource-link"
            >
              {res.title}
            </a>
          ))}
        </div>

        <div className="quiz-section card">
          <h2>Test Your Knowledge</h2>
          {!quizStarted ? (
            <button 
              className="btn btn-primary"
              onClick={() => setQuizStarted(true)}
            >
              Start Quiz
            </button>
          ) : (
            <div className="quiz-container">
              {questions.map(q => (
                <div key={q.id} className="quiz-question">
                  <p>{q.question}</p>
                  {q.options.map(opt => (
                    <label key={opt} className="quiz-option">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt}
                        onChange={() => handleAnswerChange(q.id, opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              ))}
              <button 
                className="btn btn-primary"
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </button>
            </div>
          )}
          {score !== null && (
            <div className="quiz-result">
              Your Score: {score} / {questions.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Learn;