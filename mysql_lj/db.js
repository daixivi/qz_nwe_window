// back/db.js
require('dotenv').config();

const { Pool } = require('pg'); // PostgreSQL 驱动

// 创建数据库连接池
const pool = new Pool({
  host: process.env.DB_HOST,     // ✅ 优先读环境变量，没有则用 localhost
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,     // PostgreSQL 默认 5432
});

// 测试连接
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ 数据库连接失败:', err);
  } else {
    console.log('✅ 数据库连接成功！');
    release(); // 释放客户端回连接池
  }
});

// 导出连接池对象
module.exports = pool;