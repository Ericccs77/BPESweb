const express = require('express');
const multer = require('multer');

// create app
const app = express();

// mutller to process files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // file saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname); // file name setting
    }
});

const upload = multer({ storage: storage });

// post request processing
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // return success
    res.json({
        message: 'Your image has been uploaded successfully.',
        trackLink: `Your submission has been accepted and is being processed.`
    });
});

// server start
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});


