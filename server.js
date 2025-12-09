const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db=require('./mysql_lj/db')

// 🔥 加入这一行，解决跨域问题
const cors = require('cors');
app.use(cors());

// 允许接收 JSON 格式请求（后面可能会用到，先写上）
app.use(express.json());

// 你的接口
app.get('/hello', (req, res) => {
  res.send('你好，这是后端返回的数据！');
});

app.get('/health', (req, res) => {
  db.query('SELECT 1 AS ok', (err, results) => {
    if (err) {
      console.error('❌ 健康检查 - 数据库不可达:', err);
      return res.status(503).json({
        status: 'error',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: 'Database connection failed'
      });
    }
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'connected'
    });
  });
});

// 提供一个接口，获取 person 表中的所有数据
app.get('/persons', (req, res) => {
  const sql = 'SELECT * FROM person'; // 查询 person 表
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ 查询失败:', err);
      res.status(500).send('数据库查询失败');
    } else {
      console.log('✅ 查询成功，数据：', results);
      res.json(results); // 返回 JSON 格式的数据
    }
  });
});

app.listen(port, () => {
  console.log(`🚀 后端启动成功！请访问：http://localhost:${port}/hello`);
});