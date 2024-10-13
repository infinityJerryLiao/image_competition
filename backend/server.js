import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; // 用于处理 ES 模块的路径问题
import imageRoutes from './routes/image.js'; // 引入图片路由

const app = express();
const PORT = 3001;

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 使用 cors 中间件，允许所有来源的跨域请求
app.use(cors());

// 设置静态文件夹，处理图片文件的路径
app.use('/images', express.static(path.join(__dirname, 'images'))); // 确保路径是 backend/images

// 使用 body-parser 解析 JSON 请求体
app.use(bodyParser.json());

// 用户信息（仅用于测试）
const users = [
  { username: 'testuser', password: 'testpassword' },
];

// 打印文件路径到控制台，方便调试
console.log('Images directory path:', path.join(__dirname, 'images'));

// 登录接口
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(400).json({ success: false, message: 'Invalid password' });
  }

  res.json({ success: true, message: 'Login successful' });
});

// 使用图片路由
app.use('/api/images', imageRoutes); // 确保路由设置正确，指向 /api/images

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
