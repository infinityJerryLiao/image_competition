import React, { useState, useEffect } from 'react';
import '../css/MainContent.css'; // 更新后的样式文件
import logo from '../img/logo.svg';  // 使用 import 引入图片
import menuIcon from '../img/menu-1.svg';  // 引入菜单图标
import githubIcon from '../img/github-24-outline-1.svg';
import instagramIcon from '../img/instagram-24-outline-1.svg';
import facebookIcon from '../img/facebook-24-outline-1.svg';
import linkedinIcon from '../img/linkedin-24-outline-1.svg';
import arrowForwardIcon from '../img/arrow-forward-1.svg';

// 错误图片的相对路径（从 public 文件夹开始）
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
  const [exampleImages, setExampleImages] = useState([]); // 用于存储服务器返回的考拉图片

  // 从服务器获取考拉图片
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/images');
        const data = await response.json();
        console.log('Fetched images:', data); 
        setExampleImages(data); // 设置考拉图片
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages(); // 调用函数获取图片
  }, []);

  // 生成题目
  useEffect(() => {
    if (exampleImages.length > 0) {
      const newQuestions = Array.from({ length: totalQuestions }, () => {
        const correctImage = exampleImages[Math.floor(Math.random() * exampleImages.length)];
        const wrongImages = shuffleArray(optionImages).slice(0, 3);
        const allOptions = shuffleArray([...wrongImages, correctImage]);
        return { correctImage, allOptions };
      });
      setQuestions(newQuestions);
    }
  }, [exampleImages]);

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
    setQuestions([]);
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
                      <img src={`http://localhost:3001${option}`} alt={`Option ${index + 1}`} />
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
        <div className="button-group">
          <button className="button">
            <div className="text-wrapper-4">Explore</div>
            <img className="arrow-forward" src={arrowForwardIcon} alt="Arrow Forward" />
          </button>
          <div className="icons">
            <img className="img-3" src={githubIcon} alt="GitHub" />
            <img className="img-3" src={instagramIcon} alt="Instagram" />
            <img className="img-3" src={facebookIcon} alt="Facebook" />
            <img className="img-3" src={linkedinIcon} alt="LinkedIn" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;


