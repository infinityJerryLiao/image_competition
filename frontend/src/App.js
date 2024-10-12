import './App.css';
import React, { useState } from 'react';
import './css/styleguide.css';
import MainContent from './components/MainContent';  // 合并后的 MainContent
import Login from './components/Login';  // 引入 Login 页面
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 登录状态管理

  // 登录成功的处理函数
  const handleLogin = () => {
    setIsLoggedIn(true);  // 登录成功后将状态设置为 true
  };

  return (
    <Router>
      <div className="PC">
        <div className="section">
          <Routes>
            {/* 登录页面：如果未登录，显示 Login 页面 */}
            {!isLoggedIn ? (
              <Route path="/" element={<Login onLogin={handleLogin} />} />
            ) : (
              <>
                {/* 登录成功后显示合并后的 MainContent */}
                <Route path="/competition" element={<MainContent />} />
                <Route path="*" element={<Navigate to="/competition" />} />  {/* 重定向到比赛页面 */}
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


