const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
const sql = require('mssql');

const config = {
    server: 'DESKTOP-HOME\SQL2019DEV',
    database: 'IHM',
    driver: 'tedious',
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        encrypt: false, // Đối với local development, đặt là false. Đối với Azure, cần đặt là true.
        trustServerCertificate: true, // Cần thiết khi sử dụng tự ký cert trong development
    }
};

// Dữ liệu câu hỏi giả định
const questions = [
  { id: 1, content: 'Câu hỏi 1?', answer: 'Đáp án A' },
  // Thêm các câu hỏi khác tại đây
];

// API tìm kiếm câu hỏi bằng ID
app.get('/question/:id', (req, res) => {
  const { id } = req.params;
  const question = questions.find(q => q.id.toString() === id);
  if (question) {
    res.json(question);
  } else {
    res.status(404).send('Câu hỏi không tìm thấy');
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
