import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

// 用于获取当前模块的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 定义图片文件夹路径
const imagesDir = path.join(__dirname, '../images');

// GET 请求：返回图片文件夹中的图片路径
router.get('/', (req, res) => {
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read the image directory" });
    }

    // 过滤出 jpg, png 图片文件
    const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.png'));

    // 打印文件路径到控制台，方便调试
    console.log('Image files:', imageFiles);

    // 返回图片的 URL 路径，前端可以通过这些路径访问图片
    res.json(imageFiles.map(file => `/images/${file}`));
  });
});

export default router;

