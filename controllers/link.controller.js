const Link = require('../models/Link.model');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
    

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

exports.getAllLinks = async (req, res) => { 
    res.send('Get all links');
};
exports.notFound = (req, res) => {
  res.status(404).send("<div>404 Not Found</div>");
};
exports.redirectLink = (req, res) => {
  const ending = req.params.ending;

  connection.query(
    'SELECT links FROM mytable WHERE ending = ?',
    [ending],
    (err, results) => {
      if (err) return res.status(500).send('Lỗi server');

      if (results.length > 0) {
        const { links } = results[0];
        res.send(`
          <!DOCTYPE html>
          <html lang="vi">
          <head>
            <meta charset="UTF-8">
            <title>Đang chuyển hướng...</title>
            <style>
              body { 
                font-family: sans-serif; 
                text-align: center; 
                margin-top: 100px;
              }
              #countdown {
                font-size: 24px;
                font-weight: bold;
                color: red;
              }
            </style>
          </head>
          <body>
            <h2>Trang đang được tài trợ bởi QUẢNG CÁO</h2>
            <p>Bạn sẽ được chuyển hướng sau <span id="countdown">5</span> giây...</p>
            <p><a href="${links}">Nhấn vào đây nếu không muốn đợi</a></p>
            <script>
              let seconds = 5;
              let countdownEl = document.getElementById("countdown");
              let interval = setInterval(() => {
                seconds--;
                countdownEl.textContent = seconds;
                if (seconds <= 0) {
                  clearInterval(interval);
                  window.location.href = "${links}";
                }
              }, 1000);
            </script>
          </body>
          </html>
        `);
      } else {
        res.status(404).send('Không tìm thấy liên kết');
      }
    }
  );
};

