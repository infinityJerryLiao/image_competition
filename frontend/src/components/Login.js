import React, { useState } from 'react';
import '../css/Login.css'; // 引入 Login.css 文件

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 发送登录请求到后端
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // 将用户名和密码传递到后端
      });

      const data = await response.json(); // 接收后端返回的数据

      if (data.success) {
        onLogin(); // 登录成功，调用父组件的 onLogin 函数，跳转到比赛页面
      } else {
        setErrorMessage(data.message); // 登录失败，显示错误信息
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default Login;

