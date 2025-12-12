const express = require('express');
const app = express();
const port = process.env.PORT||3000;
const pool = require('./mysql_lj/db'); // 修改为 PostgreSQL 连接池

// 解决跨域问题
const cors = require('cors');
app.use(cors());

// 允许接收 JSON 格式请求
app.use(express.json());

// 测试接口
app.get('/hello', (req, res) => {
  res.send('你好，这是后端返回的数据！');
});

// 健康检查接口
app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1');
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'connected'
    });
  } catch (err) {
    console.error('❌ 健康检查 - 数据库不可达:', err);
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: 'Database connection failed'
    });
  }
});

// 获取 users 表中的所有数据
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    console.log('✅ 查询成功，数据：', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ 查询失败:', err);
    res.status(500).send('数据库查询失败');
  }
});

app.listen(port, () => {
  console.log(`🚀 后端启动成功！请访问：http://localhost:${port}/hello`);
});