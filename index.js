const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const port = 7777;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    key: 'user_info',
    secret: 'cookie-test',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60, // 1분
    },
  })
);
// app.use(express.static("public"));

app.post('/api/user/login', (req, res, next) => {
  console.log('리퀘스트 바디', req.body);
  req.session.user_info = req.body;
  req.session.save((err) => {
    if (err) console.log('세션 저장 실패', err);
  });
  res.json({ state: true, message: 'session test' });
});

app.post('/api/user/logout', (req, res) => {
  if (req.session.user_info) {
    req.session.destroy((err) => {
      if (err) {
        console.log('세션 삭제 실패', err);
        res.json({
          state: false,
          message: 'logout fail',
        });
      } else {
        res.clearCookie('user_info');
        res.json({
          state: true,
          message: 'logout success',
        });
      }
    });
  } else {
    res.json({ state: true, message: 'logout success' });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
