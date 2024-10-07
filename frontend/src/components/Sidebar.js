import React, { useState, useEffect } from 'react';
import '../css/Sidebar.css'; // 引入 Sidebar 样式文件

// 示例图片的相对路径（从 public 文件夹开始）
const exampleImages = [
  '/img/examples/koala001.jpg',
  '/img/examples/koala002.jpg',
  '/img/examples/koala01.jpg',
  '/img/examples/koala02.jpg',
  '/img/examples/koala03.jpg',
];

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

function Sidebar() {
  const totalQuestions = 5; // 总题目数
  const [currentQuestion, setCurrentQuestion] = useState(1); // 当前题目编号
  const [questions, setQuestions] = useState([]); // 保存所有题目
  const [answers, setAnswers] = useState(Array(totalQuestions).fill(null)); // 保存选中的答案
  const [submitted, setSubmitted] = useState(false); // 是否提交的状态
  const [score, setScore] = useState(0); // 分数

  // 生成 5 道题目和选项
  const generateQuestions = () => {
    const newQuestions = Array.from({ length: totalQuestions }, () => {
      const correctImage = exampleImages[Math.floor(Math.random() * exampleImages.length)]; // 随机选择一张考拉图片
      const wrongImages = shuffleArray(optionImages).slice(0, 3); // 随机选择三张错误图片
      const allOptions = shuffleArray([...wrongImages, correctImage]); // 将正确图片和错误图片随机打乱
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
    newAnswers[index] = event.target.value; // 保存当前题目的选项
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

  // 提交答案并计算分数
  const handleSubmit = () => {
    let newScore = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctImage) {
        newScore += 1; // 如果答案正确，分数加一
      }
    });
    setScore(newScore);
    setSubmitted(true); // 设置为已提交状态
  };

  // 重新开始
  const handleRestart = () => {
    setSubmitted(false);
    setAnswers(Array(totalQuestions).fill(null)); // 重置答案
    setQuestions(generateQuestions()); // 生成新的题目
    setCurrentQuestion(1); // 重置题目编号为第一题
    setScore(0); // 重置分数
  };

  return (
    <div className="sidebar">
      {/* 显示当前题目编号 */}
      <div className="question-info">
        <p>Question {currentQuestion} / {totalQuestions}</p>
      </div>

      {/* 示例图片部分 */}
      <div className="example-image-section">
        <h2>Example Images</h2>
        <div className="example-images">
          {exampleImages.slice(0, 4).map((image, index) => (
            <img key={index} src={image} alt={`Example ${index + 1}`} />
          ))}
        </div>
      </div>

      {/* 题目部分 */}
      <div className="question-section">
        <h2>Quiz</h2>
        <p>Please choose the image with a koala:</p>

        {/* 选项部分 */}
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
                  disabled={submitted} // 提交后禁用选项
                />
                <label htmlFor={`option${index}`}>
                  <img src={option} alt={`Option ${index + 1}`} />
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 导航按钮 */}
      <div className="navigation-buttons">
        <button onClick={handlePreviousQuestion} disabled={currentQuestion === 1}>
          Previous
        </button>
        {currentQuestion < totalQuestions ? (
          <button onClick={handleNextQuestion}>
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={submitted}>
            Submit
          </button>
        )}
      </div>

      {/* 分数显示和重新开始按钮 */}
      {submitted && (
        <div className="score-section">
          <p>Your score: {score} / {totalQuestions}</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;











