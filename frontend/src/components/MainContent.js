import React, { useState, useEffect } from 'react';
import '../css/MainContent.css'; // 更新后的样式文件
import logo from '../img/logo.svg';  // 使用 import 引入图片
import menuIcon from '../img/menu-1.svg';  // 引入菜单图标

const exampleImages = [
  '/img/examples/koala001.jpg',
  '/img/examples/koala002.jpg',
  '/img/examples/koala01.jpg',
  '/img/examples/koala02.jpg',
  '/img/examples/koala03.jpg',
];

const optionImages = [
  '/img/options/cat01.jpg',
  '/img/options/dog01.jpg',
  '/img/options/dog02.jpg',
];

// 辅助函数：随机打乱数组
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

function MainContent() {
  const totalQuestions = 5; // 总题目数
  const [currentQuestion, setCurrentQuestion] = useState(1); // 当前题目编号
  const [questions, setQuestions] = useState([]); // 保存所有题目
  const [answers, setAnswers] = useState(Array(totalQuestions).fill(null)); // 保存选中的答案
  const [submitted, setSubmitted] = useState(false); // 是否提交的状态
  const [score, setScore] = useState(0); // 分数

  // 生成题目
  const generateQuestions = () => {
    const newQuestions = Array.from({ length: totalQuestions }, () => {
      const correctImage = exampleImages[Math.floor(Math.random() * exampleImages.length)];
      const wrongImages = shuffleArray(optionImages).slice(0, 3);
      const allOptions = shuffleArray([...wrongImages, correctImage]);
      return { correctImage, allOptions };
    });
    return newQuestions;
  };

  // 初始化时生成题目，只执行一次
  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  // 处理选项改变
  const handleOptionChange = (event, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  // 切换到下一题
  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // 切换到上一题
  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // 提交答案
  const handleSubmit = () => {
    setSubmitted(true);
    let calculatedScore = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctImage) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore); // 计算分数
  };

  // 重新开始
  const handleReset = () => {
    setSubmitted(false);
    setAnswers(Array(totalQuestions).fill(null));
    setQuestions(generateQuestions());
    setCurrentQuestion(1);
    setScore(0); // 重置分数
  };

  return (
    <div className="main-content">
      <header>
        <div className="nav">
          <div className="main">
            <div className="logo">
              <img className="img" src={logo} alt="Logo" />
              <div className="text-wrapper">Image recognition competition</div>
            </div>
            <div className="web-design">
              <div className="div">Web Design</div>
            </div>
            <div className="web-design">
              <div className="div">Design To Code</div>
            </div>
          </div>
          <img className="img-2" src={menuIcon} alt="Menu" />
        </div>
      </header>
      <div className="section">
        <div className="sidebar">
          <div className="question-info">
            <p>Question {currentQuestion} / {totalQuestions}</p>
          </div>

          <div className="example-image-section">
            <h2>Example Images</h2>
            <div className="example-images">
              {exampleImages.slice(0, 4).map((image, index) => (
                <img key={index} src={image} alt={`Example ${index + 1}`} />
              ))}
            </div>
          </div>

          <div className="question-section">
            <h2>Quiz</h2>
            <p>Please choose the image with a koala:</p>
            {questions.length > 0 && (
              <div className="options">
                {questions[currentQuestion - 1].allOptions.map((option, index) => (
                  <div className="option" key={index}>
                    <input
                      type="radio"
                      id={`option${index}`}
                      name={`question${currentQuestion}`}
                      value={option}
                      checked={answers[currentQuestion - 1] === option}
                      onChange={(e) => handleOptionChange(e, currentQuestion - 1)}
                    />
                    <label htmlFor={`option${index}`}>
                      <img src={option} alt={`Option ${index + 1}`} />
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="navigation-buttons">
            <button onClick={handlePreviousQuestion} disabled={currentQuestion === 1}>
              Previous
            </button>
            {currentQuestion < totalQuestions ? (
              <button onClick={handleNextQuestion}>
                Next
              </button>
            ) : (
              <button onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>

          {submitted && (
            <div className="score-section">
              <p>Your score: {score} / {totalQuestions}</p>
              <button onClick={handleReset}>Reset</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainContent;

