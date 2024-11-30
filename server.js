const express = require('express');
const multer = require('multer');

// 创建 Express 应用
const app = express();

// 设置存储引擎，使用 multer 来处理上传的文件
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 将文件存储在 uploads 文件夹中
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); // 使用当前时间戳和原始文件名作为文件名
    }
});

const upload = multer({ storage: storage });

// 处理文件上传的 POST 请求
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // 返回成功消息
    res.json({
        message: 'Your image has been uploaded successfully.',
        trackLink: `Your submission has been accepted and is being processed.`
    });
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
