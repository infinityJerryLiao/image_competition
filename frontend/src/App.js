import './App.css';
import React, { useState } from 'react';
import './css/styleguide.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
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
        {isLoggedIn && <Header />}  {/* 登录后才显示 Header */}
        <div className="section">
          <Routes>
            {/* 登录页面：如果未登录，显示 Login 页面 */}
            {!isLoggedIn ? (
              <Route path="/" element={<Login onLogin={handleLogin} />} />
            ) : (
              <>
                {/* 登录成功后显示比赛页面 */}
                <Route path="/competition" element={<Sidebar />} />
                <Route path="/main" element={<MainContent />} />
                <Route path="*" element={<Navigate to="/competition" />} />
              </>
            )}
          </Routes>
          {isLoggedIn && <MainContent />}  {/* 登录后才显示 MainContent */}
        </div>
      </div>
    </Router>
  );
}

export default App;

