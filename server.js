const express = require('express');
const multer = require('multer');
const path = require('path');

// 创建 express 应用
const app = express();

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 设置 Multer 存储配置
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 设置文件上传保存的目录
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // 给文件生成唯一的名字
    }
});

const upload = multer({ storage: storage });

// 主页路由，显示上传页面
app.get('/', (req, res) => {
    res.send(`
    <html>
      <head>
        <title>Welcome to London Underground Cleanliness Suggestions</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          h1 { text-align: center; margin-top: 30px; }
          .container { width: 50%; margin: 0 auto; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .button { padding: 10px 20px; margin: 10px 0; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; }
          .button:hover { background-color: #45a049; }
          form { display: flex; flex-direction: column; }
          label, input { margin-bottom: 10px; font-size: 16px; }
          .footer { text-align: center; margin-top: 40px; font-size: 14px; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to London Underground Cleanliness Suggestions</h1>
          <p>Please select your entry:</p>
          <a href="/personal" class="button">Personal Entry</a>
          <a href="/company" class="button">Company Entry</a>
        </div>
        <div class="footer">
          <p>&copy; 2024 London Underground</p>
        </div>
      </body>
    </html>
  `);
});

// 个人入口：上传图片
app.get('/personal', (req, res) => {
    res.send(`
    <html>
      <head>
        <title>Upload Your Image</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { width: 50%; margin: 0 auto; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          h1 { text-align: center; }
          .button { padding: 10px 20px; margin: 10px 0; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; }
          .button:hover { background-color: #45a049; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Upload Your Image</h1>
          <form action="/submit-image" method="post" enctype="multipart/form-data">
            <label for="image">Select an image:</label>
            <input type="file" name="image" id="image" accept="image/*" required>
            <button type="submit" class="button">Submit</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

// 公司入口
app.get('/company', (req, res) => {
    res.send(`
    <html>
      <head>
        <title>Company Entry</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { width: 50%; margin: 0 auto; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          h1 { text-align: center; }
          .button { padding: 10px 20px; margin: 10px 0; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; }
          .button:hover { background-color: #45a049; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Company Entry</h1>
          <p>You are not yet a registered partner. Please contact <a href="mailto:a@example.com">a@example.com</a> for partnership.</p>
        </div>
      </body>
    </html>
  `);
});

// 处理图片上传
app.post('/submit-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.send('No file uploaded.');
    }

    const fileUrl = `https://your-app-name.herokuapp.com/uploads/${req.file.filename}`;

    res.send(`
    <html>
      <head>
        <title>Submission Successful</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { width: 50%; margin: 0 auto; padding: 20px; background-color: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          h1 { text-align: center; }
          .button { padding: 10px 20px; margin: 10px 0; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; }
          .button:hover { background-color: #45a049; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thank you for your submission!</h1>
          <p>Your submission has been received and is being processed.</p>
          <p>You can track the progress of your submission using the following link:</p>
          <a href="${fileUrl}" class="button">Track Progress</a>
        </div>
      </body>
    </html>
  `);
});

// 监听 Heroku 环境的动态端口
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
