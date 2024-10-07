const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors'); // 引入 cors 中间件
const app = express();
const PORT = 3001;

// 使用 cors 中间件，允许所有来源的跨域请求
app.use(cors());

app.use(bodyParser.json());

const users = [
  { username: 'testuser', password: 'testpassword' },
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // 输出接收到的用户名和密码
  // console.log('Received username:', username);
  // console.log('Received password:', password);

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(400).json({ success: false, message: 'Invalid password' });
  }

  res.json({ success: true, message: 'Login successful' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
