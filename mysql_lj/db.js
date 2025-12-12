// back/db.js

require('dotenv').config();

const { Pool } = require('pg'); // PostgreSQL 驱动

// 创建数据库连接池 —— 使用 DATABASE_URL（推荐）
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ✅ 使用 Render 提供的完整 Internal Database URL
  ssl: { rejectUnauthorized: false } // 🔒 Render 的 PostgreSQL 有时需要关闭 SSL 验证
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