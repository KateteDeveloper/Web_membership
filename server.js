const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",  // 본인의 MySQL 비밀번호 입력
    database: "testdb"
});

db.connect(err => {
    if (err) {
        console.error("MySQL 연결 실패:", err);
    } else {
        console.log("MySQL 연결 성공!");
    }
});

app.post("/signup", (req, res) => {
    const { name, birth, phone } = req.body;
    const sql = "INSERT INTO users (name, birth, phone) VALUES (?, ?, ?)";
    
    db.query(sql, [name, birth, phone], (err, result) => {
        if (err) {
            console.error("데이터 저장 실패:", err);
            res.status(500).json({ message: "데이터 저장 실패" });
        } else {
            res.json({ message: "회원가입 완료!" });
        }
    });
});

app.listen(3000, () => {
    console.log("서버 실행 중: http://localhost:3000");
});